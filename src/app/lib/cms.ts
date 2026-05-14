import { appConfig } from '../config/env';

const buildUrl = (path: string) => {
  if (!appConfig.apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is required when VITE_DATA_PROVIDER=cms.');
  }

  return `${appConfig.apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const buildHeaders = (includeJson = true) => {
  const headers = new Headers();

  if (includeJson) {
    headers.set('Content-Type', 'application/json');
  }

  if (appConfig.apiToken) {
    headers.set('Authorization', `Bearer ${appConfig.apiToken}`);
  }

  return headers;
};

const normalizeRecord = <T>(item: unknown): T => {
  if (typeof item === 'object' && item !== null && 'attributes' in item) {
    const record = item as { id?: string | number; attributes: Record<string, unknown> };
    return {
      id: String(record.id ?? record.attributes.id ?? ''),
      ...record.attributes,
    } as T;
  }

  return item as T;
};

export const normalizeCollection = <T>(payload: unknown): T[] => {
  if (Array.isArray(payload)) {
    return payload.map((item) => normalizeRecord<T>(item));
  }

  if (typeof payload === 'object' && payload !== null && 'data' in payload) {
    const data = (payload as { data: unknown }).data;
    if (Array.isArray(data)) {
      return data.map((item) => normalizeRecord<T>(item));
    }
  }

  return [];
};

export const normalizeSingle = <T>(payload: unknown): T => {
  if (typeof payload === 'object' && payload !== null && 'data' in payload) {
    return normalizeRecord<T>((payload as { data: unknown }).data);
  }

  return normalizeRecord<T>(payload);
};

export async function cmsRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: buildHeaders(!(init?.body instanceof FormData)),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
