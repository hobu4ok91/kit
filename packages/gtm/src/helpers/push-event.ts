declare global {
  var dataLayer: unknown[];
}

export function hasDataLayer(): boolean {
  return !!globalThis.dataLayer;
}

export function pushEvent(...args: unknown[]): void {
  if ("dataLayer" in globalThis && globalThis.dataLayer) {
    globalThis.dataLayer.push(...args);
    return;
  }

  return console.error(
    "AbstractGtmEvent.dispatch(): window.dataLayer is undefined"
  );
}
