export const config = {
  logging: () => true,
  enabled: () => true,
};

export function configure(partial: typeof config) {
  Object.assign(config, partial);
}
