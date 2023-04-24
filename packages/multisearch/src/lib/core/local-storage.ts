const STORAGE_KEY = "multisearch:search-queries";

export function getFromStorage(): string[] {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

export function putToStorage(queries: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
}

export function clear() {
  putToStorage([]);
}
