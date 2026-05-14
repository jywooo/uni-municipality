const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const requiredEndpoints = {
  events: import.meta.env.VITE_CMS_EVENTS_ENDPOINT || '/events',
  registrations: import.meta.env.VITE_CMS_REGISTRATIONS_ENDPOINT || '/registrations',
  users: import.meta.env.VITE_CMS_USERS_ENDPOINT || '/users',
  venues: import.meta.env.VITE_CMS_VENUES_ENDPOINT || '/venues',
  categories: import.meta.env.VITE_CMS_CATEGORIES_ENDPOINT || '/categories',
  notifications: import.meta.env.VITE_CMS_NOTIFICATIONS_ENDPOINT || '/notifications',
};

export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'Municipality Events',
  dataProvider: import.meta.env.VITE_DATA_PROVIDER === 'cms' ? 'cms' : 'mock',
  apiBaseUrl: trimTrailingSlash(import.meta.env.VITE_API_BASE_URL || ''),
  apiToken: import.meta.env.VITE_API_TOKEN || '',
  authLoginEndpoint: import.meta.env.VITE_AUTH_LOGIN_ENDPOINT || '/auth/login',
  endpoints: requiredEndpoints,
} as const;
