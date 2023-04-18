import { AbstractGtmEvent } from "~/abstract/abstract-event";
import { GtmItem } from "~/classes/gtm-item";
import { GtmEventName } from "~/consts/gtm-event-name";

interface Payload {
  currency: string;
  items: GtmItem[];
}

export class ViewItemEvent extends AbstractGtmEvent<Payload> {
  eventName = GtmEventName.viewItem;
}
