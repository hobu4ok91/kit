import { AbstractGtmEvent } from "~/abstract/abstract-event";
import { GtmEventName } from "~/consts/gtm-event-name";

interface Payload {
  search_term: string;
}

export class SearchEvent extends AbstractGtmEvent<Payload> {
  eventName = GtmEventName.search;
}
