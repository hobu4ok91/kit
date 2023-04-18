import { AbstractGtmEvent } from "~/abstract/abstract-event";
import { AuthMethod } from "~/consts/auth-method";
import { AuthStatus } from "~/consts/auth-status";
import { GtmEventName } from "~/consts/gtm-event-name";

interface Payload {
  method: AuthMethod;
  status: AuthStatus;
}

export class LoginEvent extends AbstractGtmEvent<Payload> {
  eventName = GtmEventName.login;
}
