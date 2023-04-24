import "./app.css";
import AppProd from "./App.svelte";
import { isPreventedLinks, isShownSearch } from "./lib/store/config";
import { query } from "./lib/store/search";
import { desktopOffset } from "./lib/store/dialog";
import { configure } from "./lib/core/settings";

interface InitConfig {
  target: HTMLElement;
  apiUrl: string;
}

function toggleSearch(value: boolean) {
  return isShownSearch.set(value);
}

function preventLinks(value: boolean) {
  return isPreventedLinks.set(value);
}

function setDesktopOffset(value: number) {
  return desktopOffset.set(value);
}

function setQuery(value: string) {
  query.set(value);
}

function init(config: InitConfig) {
  configure({ apiUrl: config.apiUrl });

  new AppProd({
    target: config.target,
  });
}

export { BlurEvent, SearchEvent, SelectCategoryEvent } from "./lib/events";
export { init, toggleSearch, setQuery, preventLinks, setDesktopOffset };
