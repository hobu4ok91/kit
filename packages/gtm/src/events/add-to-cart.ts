import { AbstractGtmEvent } from "~/abstract/abstract-event";
import { GtmItem } from "~/classes/gtm-item";
import { GtmEventName } from "~/consts/gtm-event-name";

interface Payload {
  value: number;
  currency: string;
  items: GtmItem[];
}

export class AddToCartEvent extends AbstractGtmEvent<Payload> {
  readonly eventName = GtmEventName.addToCart;
}
