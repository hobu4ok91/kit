export const settings = {
  apiUrl: "",
};

export function configure(partial: Partial<typeof settings>) {
  Object.assign(settings, partial);
}
