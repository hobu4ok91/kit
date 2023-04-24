import watchMedia from 'svelte-media'
import type { Writable } from 'svelte/store'

export interface MediaState {
  desktop: boolean
}

const mediaqueries = {
  desktop: '(min-width: 1024px)',
}

export const media: Writable<MediaState> = watchMedia(mediaqueries) as Writable<
  MediaState
>
