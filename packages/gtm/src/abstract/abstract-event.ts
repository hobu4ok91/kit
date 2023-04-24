import { config } from "~/config";
import { GtmEventName } from "~/consts/gtm-event-name";
import { isEcommerce } from "~/helpers/is-eccomerce";
import { hasDataLayer, pushEvent } from "~/helpers/push-event";

export abstract class AbstractGtmEvent<T> {
  abstract readonly eventName: GtmEventName;

  get isEcommerce() {
    return isEcommerce(this.eventName);
  }

  dispatch(payload: T) {
    if (this.checkConditions()) {
      this.dispatchEvent(payload);
    }
  }

  private dispatchEvent(payload: T) {
    if (this.isEcommerce) {
      pushEvent({ ecommerce: null });
    }

    pushEvent(this.fixPayload(payload));
  }

  private checkConditions() {
    const enabled = config.enabled();
    const hasLayer = hasDataLayer();

    if (config.logging()) {
      if (!enabled) {
        console.warn("GTM: config.enabled is false");
      }
      if (!hasLayer) {
        console.warn("GTM: window.dataLayer is undefined");
      }
    }

    return enabled && hasDataLayer;
  }

  private fixPayload(payload: T) {
    return this.isEcommerce
      ? { event: this.eventName, ecommerce: payload }
      : { event: this.eventName, ...payload };
  }
}
