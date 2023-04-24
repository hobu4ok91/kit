import { settings } from "~/lib/core/settings";

export let createSearchUrl = (query: string) => {
  const params = new URLSearchParams({ q: query });

  return `${settings.apiUrl}/search?${params}`;
};
