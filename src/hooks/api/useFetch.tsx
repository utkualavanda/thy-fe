import { baseUrl } from '../../constants/api';

interface FetchArgs {
  body?: Record<string, unknown>;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
}

const request = async <Response,>({ body, method, url }: FetchArgs) =>
  fetch(baseUrl + url, {
    body: body ? JSON.stringify(body) : undefined,
    method,
  }).then(async (response): Promise<Response> => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject({
      ...(await response.json()),
    });
  });

export const useFetch = () => {
  return {
    customFetch: async <ResponseBody,>({ body, method, url }: FetchArgs) =>
      request<ResponseBody>({
        method,
        url,
        body,
      }),
  };
};
