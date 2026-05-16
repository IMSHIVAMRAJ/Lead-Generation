const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

const request = async <T>(
  path: string,
  method: HttpMethod,
  body?: unknown,
  token?: string
): Promise<T> => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }

  return response.json() as Promise<T>;
};

export const apiClient = {
  get: <T>(path: string, token?: string) => request<T>(path, "GET", undefined, token),
  post: <T>(path: string, body: unknown, token?: string) => request<T>(path, "POST", body, token),
  patch: <T>(path: string, body: unknown, token?: string) => request<T>(path, "PATCH", body, token),
  delete: <T>(path: string, token?: string) => request<T>(path, "DELETE", undefined, token)
};
