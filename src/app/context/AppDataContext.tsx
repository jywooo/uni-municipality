import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { appConfig } from '../config/env';
import { seedAppData } from '../data/mockData';
import { cmsRequest, normalizeCollection, normalizeSingle } from '../lib/cms';
import type {
  AppDataState,
  AuthResult,
  Event,
  EventFormValues,
  LoginCredentials,
  Notification,
  NotificationFormValues,
  Registration,
  RegistrationFormValues,
  RegistrationStatus,
  User,
  UserRole,
  UserStatus,
} from '../types/models';

const STORAGE_KEY = 'uni-municipality:data';

interface AppDataContextValue extends AppDataState {
  isLoading: boolean;
  provider: 'mock' | 'cms';
  refreshData: () => Promise<void>;
  authenticate: (credentials: LoginCredentials) => Promise<AuthResult>;
  getDemoUserByRole: (role: UserRole) => User | undefined;
  registerForEvent: (eventId: string, values: RegistrationFormValues) => Promise<Registration>;
  cancelRegistration: (registrationId: string) => Promise<void>;
  saveEvent: (values: EventFormValues, organizerId: string, eventId?: string) => Promise<Event>;
  updateUserStatus: (userId: string, status: UserStatus) => Promise<User>;
  updateRegistrationStatus: (registrationId: string, status: RegistrationStatus) => Promise<Registration>;
  sendNotification: (values: NotificationFormValues) => Promise<Notification>;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

const cloneSeedData = (): AppDataState => JSON.parse(JSON.stringify(seedAppData)) as AppDataState;

const getStoredState = (): AppDataState => {
  if (typeof window === 'undefined') {
    return cloneSeedData();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return cloneSeedData();
  }

  try {
    return JSON.parse(stored) as AppDataState;
  } catch {
    return cloneSeedData();
  }
};

const saveStoredState = (value: AppDataState) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }
};

const buildId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const buildQrCode = (eventId: string) =>
  `QR-${Math.random().toString(36).slice(2, 8).toUpperCase()}-${eventId}`;

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AppDataState>(() =>
    appConfig.dataProvider === 'mock' ? getStoredState() : cloneSeedData(),
  );
  const [isLoading, setIsLoading] = useState(appConfig.dataProvider === 'cms');

  const setAndPersist = useCallback((next: AppDataState) => {
    setData(next);
    if (appConfig.dataProvider === 'mock') {
      saveStoredState(next);
    }
  }, []);

  const refreshData = useCallback(async () => {
    if (appConfig.dataProvider !== 'cms') {
      return;
    }

    setIsLoading(true);

    try {
      const [eventsPayload, registrationsPayload, usersPayload, venuesPayload, categoriesPayload, notificationsPayload] =
        await Promise.all([
          cmsRequest<unknown>(appConfig.endpoints.events),
          cmsRequest<unknown>(appConfig.endpoints.registrations),
          cmsRequest<unknown>(appConfig.endpoints.users),
          cmsRequest<unknown>(appConfig.endpoints.venues),
          cmsRequest<unknown>(appConfig.endpoints.categories),
          cmsRequest<unknown>(appConfig.endpoints.notifications),
        ]);

      setData({
        events: normalizeCollection<Event>(eventsPayload),
        registrations: normalizeCollection<Registration>(registrationsPayload),
        users: normalizeCollection<User>(usersPayload),
        venues: normalizeCollection<AppDataState['venues'][number]>(venuesPayload),
        categories: normalizeCollection<AppDataState['categories'][number]>(categoriesPayload),
        notifications: normalizeCollection<Notification>(notificationsPayload),
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (appConfig.dataProvider === 'cms') {
      void refreshData();
    }
  }, [refreshData]);

  const authenticate = useCallback(
    async ({ email, password }: LoginCredentials): Promise<AuthResult> => {
      if (appConfig.dataProvider === 'mock') {
        const user = data.users.find(
          (candidate) => candidate.email.toLowerCase() === email.toLowerCase() && candidate.status === 'Active',
        );

        if (!user) {
          throw new Error('Invalid email or password');
        }

        return { user };
      }

      const payload = await cmsRequest<unknown>(appConfig.authLoginEndpoint, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const normalized = normalizeSingle<AuthResult>(payload);

      if (!normalized?.user) {
        throw new Error('CMS login response did not include a user object.');
      }

      return normalized;
    },
    [data.users],
  );

  const getDemoUserByRole = useCallback(
    (role: UserRole) => data.users.find((candidate) => candidate.role === role && candidate.status === 'Active'),
    [data.users],
  );

  const registerForEvent = useCallback(
    async (eventId: string, values: RegistrationFormValues) => {
      if (appConfig.dataProvider === 'cms') {
        const payload = await cmsRequest<unknown>(appConfig.endpoints.registrations, {
          method: 'POST',
          body: JSON.stringify({
            eventId,
            participantId: values.participantId,
            participantName: values.fullName,
            email: values.email,
            phone: values.phone,
            municipality: values.municipality,
            notes: values.notes,
          }),
        });
        await refreshData();
        return normalizeSingle<Registration>(payload);
      }

      const event = data.events.find((entry) => entry.id === eventId);
      if (!event) {
        throw new Error('Event not found.');
      }

      if (event.registered >= event.capacity) {
        throw new Error('Sorry, this event is fully booked.');
      }

      const matchedUser = data.users.find((user) => user.email.toLowerCase() === values.email.toLowerCase());
      const registration: Registration = {
        id: buildId(),
        eventId,
        participantId: values.participantId || matchedUser?.id || `guest-${buildId()}`,
        participantName: values.fullName,
        email: values.email,
        phone: values.phone,
        municipality: values.municipality,
        notes: values.notes,
        status: 'Confirmed',
        registrationDate: new Date().toISOString().slice(0, 10),
        qrCode: buildQrCode(eventId),
      };

      const next: AppDataState = {
        ...data,
        events: data.events.map((entry) =>
          entry.id === eventId ? { ...entry, registered: entry.registered + 1 } : entry,
        ),
        registrations: [registration, ...data.registrations],
      };

      setAndPersist(next);
      return registration;
    },
    [data, refreshData, setAndPersist],
  );

  const cancelRegistration = useCallback(
    async (registrationId: string) => {
      if (appConfig.dataProvider === 'cms') {
        await cmsRequest<void>(`${appConfig.endpoints.registrations}/${registrationId}`, {
          method: 'DELETE',
        });
        await refreshData();
        return;
      }

      const registration = data.registrations.find((entry) => entry.id === registrationId);
      if (!registration) {
        return;
      }

      const next: AppDataState = {
        ...data,
        registrations: data.registrations.filter((entry) => entry.id !== registrationId),
        events: data.events.map((entry) =>
          entry.id === registration.eventId ? { ...entry, registered: Math.max(0, entry.registered - 1) } : entry,
        ),
      };

      setAndPersist(next);
    },
    [data, refreshData, setAndPersist],
  );

  const saveEvent = useCallback(
    async (values: EventFormValues, organizerId: string, eventId?: string) => {
      if (appConfig.dataProvider === 'cms') {
        const endpoint = eventId ? `${appConfig.endpoints.events}/${eventId}` : appConfig.endpoints.events;
        const method = eventId ? 'PATCH' : 'POST';
        const payload = await cmsRequest<unknown>(endpoint, {
          method,
          body: JSON.stringify({ ...values, organizerId }),
        });
        await refreshData();
        return normalizeSingle<Event>(payload);
      }

      const existing = eventId ? data.events.find((entry) => entry.id === eventId) : undefined;
      const nextEvent: Event = {
        id: eventId || buildId(),
        organizerId,
        registered: existing?.registered ?? 0,
        imageUrl: existing?.imageUrl,
        ...values,
      };

      const next: AppDataState = {
        ...data,
        events: eventId
          ? data.events.map((entry) => (entry.id === eventId ? nextEvent : entry))
          : [nextEvent, ...data.events],
      };

      setAndPersist(next);
      return nextEvent;
    },
    [data, refreshData, setAndPersist],
  );

  const updateUserStatus = useCallback(
    async (userId: string, status: UserStatus) => {
      if (appConfig.dataProvider === 'cms') {
        const payload = await cmsRequest<unknown>(`${appConfig.endpoints.users}/${userId}`, {
          method: 'PATCH',
          body: JSON.stringify({ status }),
        });
        await refreshData();
        return normalizeSingle<User>(payload);
      }

      const user = data.users.find((entry) => entry.id === userId);
      if (!user) {
        throw new Error('User not found.');
      }

      const updatedUser = { ...user, status };
      const next: AppDataState = {
        ...data,
        users: data.users.map((entry) => (entry.id === userId ? updatedUser : entry)),
      };

      setAndPersist(next);
      return updatedUser;
    },
    [data, refreshData, setAndPersist],
  );

  const updateRegistrationStatus = useCallback(
    async (registrationId: string, status: RegistrationStatus) => {
      if (appConfig.dataProvider === 'cms') {
        const payload = await cmsRequest<unknown>(`${appConfig.endpoints.registrations}/${registrationId}`, {
          method: 'PATCH',
          body: JSON.stringify({ status }),
        });
        await refreshData();
        return normalizeSingle<Registration>(payload);
      }

      const registration = data.registrations.find((entry) => entry.id === registrationId);
      if (!registration) {
        throw new Error('Registration not found.');
      }

      const updatedRegistration = { ...registration, status };
      const next: AppDataState = {
        ...data,
        registrations: data.registrations.map((entry) =>
          entry.id === registrationId ? updatedRegistration : entry,
        ),
      };

      setAndPersist(next);
      return updatedRegistration;
    },
    [data, refreshData, setAndPersist],
  );

  const sendNotification = useCallback(
    async (values: NotificationFormValues) => {
      const event = data.events.find((entry) => entry.id === values.eventId);
      if (!event) {
        throw new Error('Event not found.');
      }

      if (appConfig.dataProvider === 'cms') {
        const payload = await cmsRequest<unknown>(appConfig.endpoints.notifications, {
          method: 'POST',
          body: JSON.stringify(values),
        });
        await refreshData();
        return normalizeSingle<Notification>(payload);
      }

      const notification: Notification = {
        id: buildId(),
        eventId: values.eventId,
        message: values.message,
        type: values.type,
        recipientCount: event.registered,
        sentDate: new Date().toISOString().slice(0, 10),
      };

      const next: AppDataState = {
        ...data,
        notifications: [notification, ...data.notifications],
      };

      setAndPersist(next);
      return notification;
    },
    [data, refreshData, setAndPersist],
  );

  const value = useMemo<AppDataContextValue>(
    () => ({
      ...data,
      isLoading,
      provider: appConfig.dataProvider,
      refreshData,
      authenticate,
      getDemoUserByRole,
      registerForEvent,
      cancelRegistration,
      saveEvent,
      updateUserStatus,
      updateRegistrationStatus,
      sendNotification,
    }),
    [
      authenticate,
      cancelRegistration,
      data,
      getDemoUserByRole,
      isLoading,
      refreshData,
      registerForEvent,
      saveEvent,
      sendNotification,
      updateRegistrationStatus,
      updateUserStatus,
    ],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }

  return context;
};
