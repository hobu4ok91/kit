export const config = {
  log: () => true,
  enable: () => true,
};

export function configure(partial: typeof config) {
  Object.assign(config, partial);
}
