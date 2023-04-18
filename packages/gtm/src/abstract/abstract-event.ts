import { GtmEventName } from "~/consts/gtm-event-name";
import { isEcommerce } from "~/helpers/is-eccomerce";
import { pushEvent } from "~/helpers/push-event";

export abstract class AbstractGtmEvent<T> {
  abstract readonly eventName: GtmEventName;

  get isEcommerce() {
    return isEcommerce(this.eventName);
  }

  dispatch(payload: T) {
    if (this.isEcommerce) {
      pushEvent({ ecommerce: null });
    }

    pushEvent(this.fixPayload(payload));
  }

  private fixPayload(payload: T) {
    return this.isEcommerce
      ? { event: this.eventName, ecommerce: payload }
      : { event: this.eventName, ...payload };
  }
}
