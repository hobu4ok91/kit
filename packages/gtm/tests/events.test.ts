/// <reference types="vitest" />

import { test, assert, beforeAll } from "vitest";
import { AuthMethod, AuthStatus, GtmEventName } from "~/consts";
import { LoginEvent, SignupEvent } from "~/events";

beforeAll(() => {
  globalThis.dataLayer = [] || globalThis.dataLayer;
});

test("SignupEvent dispatched", () => {
  const event = new SignupEvent();

  event.dispatch({ method: AuthMethod.email, status: AuthStatus.success });

  type Payload = Parameters<typeof event["dispatch"]>[0];

  const payload = findPayload(event.eventName);

  assert.deepEqual(payload, {
    event: GtmEventName.signUp,
    method: AuthMethod.email,
    status: AuthStatus.success,
  } as Payload & { event: GtmEventName });
});

test("LoginEvent dispatched", () => {
  const event = new LoginEvent();

  event.dispatch({ method: AuthMethod.email, status: AuthStatus.success });

  type Payload = Parameters<typeof event["dispatch"]>[0];

  const payload = findPayload(event.eventName);

  assert.deepEqual(payload, {
    event: GtmEventName.login,
    method: AuthMethod.email,
    status: AuthStatus.success,
  } as Payload & { event: GtmEventName });
});

function findPayload(eventName: GtmEventName) {
  return globalThis.dataLayer.find((data: any) => {
    return "event" in data && data.event === eventName;
  });
}
