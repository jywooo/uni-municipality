export type UserRole = 'Participant' | 'Organizer' | 'Admin';
export type UserStatus = 'Active' | 'Inactive';
export type EventStatus = 'Draft' | 'Published' | 'Closed';
export type RegistrationStatus = 'Registered' | 'Confirmed' | 'Attended' | 'Absent';
export type NotificationType = 'Confirmation' | 'Reminder' | 'Event update' | 'Cancellation';

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  capacity: number;
  registered: number;
  registrationDeadline: string;
  status: EventStatus;
  organizerId: string;
  imageUrl?: string;
}

export interface Registration {
  id: string;
  eventId: string;
  participantId: string;
  participantName: string;
  email: string;
  phone: string;
  municipality: string;
  notes: string;
  status: RegistrationStatus;
  registrationDate: string;
  qrCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
  status: UserStatus;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  eventId: string;
  message: string;
  sentDate: string;
  recipientCount: number;
}

export interface AppDataState {
  events: Event[];
  registrations: Registration[];
  users: User[];
  venues: Venue[];
  categories: Category[];
  notifications: Notification[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  token?: string;
}

export interface EventFormValues {
  title: string;
  description: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  capacity: number;
  registrationDeadline: string;
  status: EventStatus;
}

export interface RegistrationFormValues {
  fullName: string;
  email: string;
  phone: string;
  municipality: string;
  notes: string;
  participantId?: string;
}

export interface NotificationFormValues {
  eventId: string;
  type: NotificationType;
  message: string;
}
