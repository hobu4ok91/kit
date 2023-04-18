import { AbstractGtmEvent } from "~/abstract/abstract-event";
import { GtmItem } from "~/classes/gtm-item";
import { GtmEventName } from "~/consts/gtm-event-name";

interface Payload {
  item_list_name: string;
  currency?: string;
  items: GtmItem[];
}

export class SelectItemEvent extends AbstractGtmEvent<Payload> {
  eventName = GtmEventName.selectItem;
}
