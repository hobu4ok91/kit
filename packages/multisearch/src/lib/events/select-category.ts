import { dispatch, subscribe, type SubscribeHandler } from "../core/emitter";

const EVENT_NAME = "multisearch:select-category";

export class SelectCategoryEvent {
  dispatch(url: string) {
    dispatch(EVENT_NAME, url);
  }

  subscribe(fn: SubscribeHandler<string>) {
    return subscribe(EVENT_NAME, fn);
  }
}
