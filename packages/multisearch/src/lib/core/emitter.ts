export type Unsubscribe = () => void;
export type SubscribeHandler<T> = (e: T) => unknown;

export function dispatch(eventName: string, detail: unknown) {
  const event = new CustomEvent(eventName, { detail });

  globalThis.dispatchEvent(event);
}

export function subscribe<T>(eventName: string, fn: SubscribeHandler<T>) {
  const handler = (event: CustomEvent<T>) => {
    return fn(event.detail);
  };

  window.addEventListener(eventName, handler);

  return () => window.removeEventListener(eventName, handler);
}
