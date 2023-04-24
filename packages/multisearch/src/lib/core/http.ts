import { hasServerError } from "../store/search";

export const http = {
  async get<T>(
    url: string,
    searchParams: Record<string, string>
  ): Promise<T | undefined> {
    const queryParams = new URLSearchParams(searchParams);

    return handleError(async () => {
      const response = await fetch(`${url}?${queryParams}`);

      return await response.json();
    });
  },
};

async function handleError<T>(fn: () => Promise<T | undefined>) {
  try {
    return await fn();
  } catch (e) {
    hasServerError.set(true);
  }
}
