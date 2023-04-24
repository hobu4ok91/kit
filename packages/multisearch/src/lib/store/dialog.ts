import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const desktopOffset: Writable<number | null> = writable(60);
