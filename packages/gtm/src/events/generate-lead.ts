import { AbstractGtmEvent } from "~/abstract/abstract-event";
import { GtmEventName } from "~/consts/gtm-event-name";

interface Payload {
  lead_type: string;
  subject: string;
}

export class GenerateLeadEvent extends AbstractGtmEvent<Payload> {
  eventName = GtmEventName.generateLead;
}
