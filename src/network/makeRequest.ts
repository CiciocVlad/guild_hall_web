import { apiServerUrl } from '../server';

export interface Config {
  path: string;
  method: string;
  body?: any;
  headers?: any;
  token?: string | null;
  notFoundRoute?: string;
  onError?: (value: any) => void;
}

export const makeRequest = async ({
  path = '',
  method,
  body,
  headers,
  token,
  notFoundRoute = '/notfound',
  onError,
}: Config) => {
  try {
    const response = await fetch(`${apiServerUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: JSON.stringify(body),
    }).catch((error) => {
      // it will only reject on network failure or if anything prevented the request from completing
      return error;
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = '/login';
      }

      if (response.status === 403) {
        window.location.href = '/unauthorised';
      }

      if (response.status === 404) {
        window.location.href = notFoundRoute;
      }

      try {
        const errorObj = await response.json();
        onError && onError({ error: errorObj });
        return { error: errorObj, status: response.status };
      } catch (error) {
        onError && onError({ error });
        return { error, status: response.status };
      }
    }

    const data = await response.json();
    return { data, headers: response.headers, status: response.status };
  } catch (error) {
    return { error };
  }
};
