import { dispatch, subscribe, type SubscribeHandler } from "../core/emitter";

const EVENT_NAME = "multisearch:blur";

export class BlurEvent {
  dispatch(query: string) {
    dispatch(EVENT_NAME, query);
  }

  subscribe(fn: SubscribeHandler<string>) {
    return subscribe(EVENT_NAME, fn);
  }
}
