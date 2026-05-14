import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initialData } from '../../data/mockData.js';

const AppDataContext = createContext(undefined);
const STORAGE_KEY = 'municipality-events-data';

function cloneData() {
  return normalizeData(JSON.parse(JSON.stringify(initialData)));
}

function buildScanToken() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function normalizeUser(user) {
  return {
    ...user,
    password: user.password || 'municipality123',
  };
}

function normalizeRegistration(registration) {
  return {
    ...registration,
    scanToken: registration.scanToken || buildScanToken(),
  };
}

function mergeMissingById(currentItems = [], seededItems = []) {
  const existingIds = new Set(currentItems.map((item) => item.id));
  const missingSeededItems = seededItems.filter((item) => !existingIds.has(item.id));
  return [...currentItems, ...missingSeededItems];
}

function normalizeData(data) {
  const mergedUsers = mergeMissingById(data.users, initialData.users);
  const mergedRegistrations = mergeMissingById(data.registrations, initialData.registrations);

  return {
    ...data,
    users: mergedUsers.map(normalizeUser),
    registrations: mergedRegistrations.map(normalizeRegistration),
  };
}

function loadData() {
  if (typeof window === 'undefined') {
    return cloneData();
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return cloneData();
  }

  try {
    return normalizeData(JSON.parse(saved));
  } catch {
    return cloneData();
  }
}

function saveData(nextData) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
  }
}

function buildId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function buildQrCode(eventId) {
  return `QR-${eventId}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

export function AppDataProvider({ children }) {
  const [data, setData] = useState(loadData);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) {
        return;
      }

      try {
        setData(JSON.parse(event.newValue));
      } catch {
        setData(cloneData());
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const updateData = (updater) => {
    setData((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      saveData(next);
      return next;
    });
  };

  const value = useMemo(() => {
    const loginUser = (email, password) =>
      data.users.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase()
          && user.password === password
          && user.status === 'Active',
      );

    const getUserByRole = (role) =>
      data.users.find((user) => user.role === role && user.status === 'Active');

    const createParticipantUser = (values) => {
      const normalizedEmail = values.email.trim().toLowerCase();
      const emailExists = data.users.some((user) => user.email.toLowerCase() === normalizedEmail);

      if (emailExists) {
        throw new Error('An account with this email already exists.');
      }

      const nextUser = {
        id: buildId(),
        name: values.fullName.trim(),
        email: normalizedEmail,
        password: values.password,
        role: 'Participant',
        status: 'Active',
        phone: values.phone.trim(),
        municipality: values.municipality.trim(),
      };

      updateData((current) => ({
        ...current,
        users: [nextUser, ...current.users],
      }));

      return nextUser;
    };

    const registerForEvent = (eventId, values) => {
      const event = data.events.find((item) => item.id === eventId);
      if (!event) {
        throw new Error('Event not found.');
      }

      if (event.registered >= event.capacity) {
        throw new Error('This event is fully booked.');
      }

      const registration = {
        id: buildId(),
        eventId,
        participantId: values.participantId || `guest-${buildId()}`,
        participantName: values.fullName,
        email: values.email,
        phone: values.phone,
        municipality: values.municipality,
        notes: values.notes,
        status: 'Registered',
        registrationDate: new Date().toISOString().slice(0, 10),
        qrCode: buildQrCode(eventId),
        scanToken: buildScanToken(),
      };

      updateData((current) => ({
        ...current,
        events: current.events.map((item) =>
          item.id === eventId ? { ...item, registered: item.registered + 1 } : item,
        ),
        registrations: [registration, ...current.registrations],
      }));

      return registration;
    };

    const cancelRegistration = (registrationId) => {
      updateData((current) => {
        const registration = current.registrations.find((item) => item.id === registrationId);
        if (!registration) {
          return current;
        }

        return {
          ...current,
          registrations: current.registrations.filter((item) => item.id !== registrationId),
          events: current.events.map((item) =>
            item.id === registration.eventId
              ? { ...item, registered: Math.max(0, item.registered - 1) }
              : item,
          ),
        };
      });
    };

    const saveEvent = (formData, organizerId, eventId) => {
      const nextEvent = {
        ...formData,
        id: eventId || buildId(),
        organizerId,
      };

      updateData((current) => {
        if (eventId) {
          return {
            ...current,
            events: current.events.map((item) =>
              item.id === eventId ? { ...item, ...nextEvent, registered: item.registered } : item,
            ),
          };
        }

        return {
          ...current,
          events: [{ ...nextEvent, registered: 0 }, ...current.events],
        };
      });
    };

    const updateRegistrationStatus = (registrationId, status) => {
      updateData((current) => ({
        ...current,
        registrations: current.registrations.map((item) =>
          item.id === registrationId ? { ...item, status } : item,
        ),
      }));
    };

    const updateUserStatus = (userId, status) => {
      updateData((current) => ({
        ...current,
        users: current.users.map((item) => (item.id === userId ? { ...item, status } : item)),
      }));
    };

    const addNotification = (values) => {
      const event = data.events.find((item) => item.id === values.eventId);
      const notification = {
        id: buildId(),
        eventId: values.eventId,
        type: values.type,
        message: values.message,
        sentDate: new Date().toISOString().slice(0, 10),
        recipientCount: event ? event.registered : 0,
      };

      updateData((current) => ({
        ...current,
        notifications: [notification, ...current.notifications],
      }));
    };

    return {
      ...data,
      loginUser,
      getUserByRole,
      createParticipantUser,
      registerForEvent,
      cancelRegistration,
      saveEvent,
      updateRegistrationStatus,
      updateUserStatus,
      addNotification,
    };
  }, [data]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used inside AppDataProvider.');
  }

  return context;
}
