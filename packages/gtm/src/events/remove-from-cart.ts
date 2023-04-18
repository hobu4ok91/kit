import { AbstractGtmEvent } from "~/abstract/abstract-event";
import { GtmItem } from "~/classes/gtm-item";
import { GtmEventName } from "~/consts/gtm-event-name";

interface Payload {
  value?: number;
  currency?: string;
  items: GtmItem[];
}

export class RemoveFromCartEvent extends AbstractGtmEvent<Payload> {
  eventName = GtmEventName.removeFromCart;
}
