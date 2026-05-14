export const QR_PREFIX = 'MUNI-CHECKIN:';
export const CHECK_IN_PATH = '/scan-checkin';
export const SHORT_CHECK_IN_PATH = '/s';

function normalizeBaseUrl(baseUrl) {
  if (!baseUrl) {
    return '';
  }

  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

export function resolveAppBaseUrl(baseUrl) {
  if (baseUrl) {
    return normalizeBaseUrl(baseUrl);
  }

  const configuredUrl = import.meta.env.VITE_PUBLIC_APP_URL;
  if (configuredUrl) {
    return normalizeBaseUrl(configuredUrl);
  }

  if (typeof window !== 'undefined') {
    return normalizeBaseUrl(window.location.origin);
  }

  return '';
}

export function buildCheckInUrl(registration, baseUrl) {
  const origin = resolveAppBaseUrl(baseUrl);
  const code = encodeURIComponent(registration.scanToken || registration.qrCode);

  return `${origin}${SHORT_CHECK_IN_PATH}/${code}`;
}

export function buildCheckInPayload(registration, baseUrl) {
  const publicUrl = buildCheckInUrl(registration, baseUrl);
  return publicUrl || `${QR_PREFIX}${registration.qrCode}`;
}

export function extractCheckInCode(scannedValue) {
  if (!scannedValue) {
    return '';
  }

  const trimmedValue = scannedValue.trim();

  if (trimmedValue.startsWith(QR_PREFIX)) {
    return trimmedValue.slice(QR_PREFIX.length).trim();
  }

  try {
    const parsedUrl = new URL(trimmedValue);
    const queryCode = parsedUrl.searchParams.get('code');
    if (queryCode) {
      return queryCode.trim();
    }

    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment && (parsedUrl.pathname.startsWith(SHORT_CHECK_IN_PATH) || parsedUrl.pathname.startsWith(CHECK_IN_PATH))) {
      return decodeURIComponent(lastSegment).trim();
    }

    return trimmedValue;
  } catch {
    return trimmedValue;
  }
}
