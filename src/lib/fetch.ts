import { cookies } from 'next/headers';

const getHeaders = async (headers?: HeadersInit) => {
  const _cookies = await cookies();

  return {
    ...headers,
    cookie: _cookies.toString(),
  };
};

const getUrl = (url: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const requestUrl = new URL(url, baseUrl);
  return requestUrl.toString();
};

const getBody = <T>(c: Response | Request): Promise<T> => {
  return c.json();
};

export const customFetch = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = await getHeaders(options?.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
    credentials: 'include',
  };

  const response = await fetch(requestUrl, requestInit);
  const data = await getBody(response);

  return {
    status: response.status,
    data,
    headers: response.headers,
  } as T;
};
