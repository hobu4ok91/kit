import { AbstractGtmEvent } from "~/abstract/abstract-event";
import { GtmEventName } from "~/consts/gtm-event-name";

interface Payload {
  search_term: string;
}

export class SearchByVinEvent extends AbstractGtmEvent<Payload> {
  eventName = GtmEventName.searchByVin;
}
