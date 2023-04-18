import { AbstractGtmEvent } from "~/abstract/abstract-event";
import { GtmItem } from "~/classes/gtm-item";
import { GtmEventName } from "~/consts/gtm-event-name";

interface Payload {
  value: number;
  shipping: number;
  transaction_id: string;
  currency: string;
  items: GtmItem[];
}

export class PurchaseEvent extends AbstractGtmEvent<Payload> {
  eventName = GtmEventName.purchase;
}
