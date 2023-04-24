import type { Readable, Writable } from 'svelte/store'
import { writable, derived } from 'svelte/store'
import type { Category } from '../types/category'
import type { Suggestion } from '../types/suggestion'
import { history } from './history'
import { searchResult, suggestionsWithDefault } from './search'

type Direction = 'next' | 'back'

export enum Entity {
  suggestion,
  category,
  history,
}

export const entity = writable(Entity.suggestion)
export const index: Writable<number | null> = writable(null)

const data = derived(
  [searchResult, suggestionsWithDefault, history],
  ([$result, $suggestions, $history]) => {
    return {
      [Entity.suggestion]: $suggestions,
      [Entity.category]: $result?.categories ?? [],
      [Entity.history]: $history,
    }
  },
)

const entityValues = Object.values(Entity).filter((val) =>
  Number.isInteger(val),
)

const notEmptyEntities = derived(data, ($data) => {
  return entityValues.filter((ent) => $data[ent].length > 0) as Entity[]
})

export const currentItem: Readable<Suggestion | string | Category> = derived(
  [data, index, entity],
  ([$data, $index, $entity]) => {
    if ($index !== null) {
      return $data[$entity][$index]
    }

    return null
  },
)

export const onKeyPress = derived(
  [entity, index, data, notEmptyEntities],
  ([$entity, $index, $data, $notEmptyEntities]) => {
    return (e: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown'].includes(e.code)) {
        return
      }

      const direction: Direction = e.code === 'ArrowDown' ? 'next' : 'back'
      const entitiesLength: number = $data[$entity].length

      if (direction === 'next') {
        if ($index < entitiesLength - 1) {
          index.update((value) => {
            if (value === null) {
              return 0
            }

            return value + 1
          })
        } else {
          entity.set(getNextEntity($entity, $notEmptyEntities))
          index.set(0)
        }
      } else {
        if ($index > 0) {
          index.update((value) => value - 1)
        } else {
          const prevEntity = getPreviousEntity($entity, $notEmptyEntities)
          const prevEntitiesLength = $data[prevEntity].length

          entity.set(prevEntity)
          index.set(prevEntitiesLength - 1)
        }
      }
    }
  },
)

function getNextEntity(current: Entity, notEmptyEntities: Entity[]): Entity {
  const potentialNextIndex = notEmptyEntities.indexOf(current) + 1

  if (notEmptyEntities[potentialNextIndex]) {
    return notEmptyEntities[potentialNextIndex]
  }

  return notEmptyEntities[0]
}

function getPreviousEntity(
  current: Entity,
  notEmptyEntities: Entity[],
): Entity {
  const potentialPrevIndex = notEmptyEntities.indexOf(current) - 1

  if (notEmptyEntities[potentialPrevIndex] >= 0) {
    return notEmptyEntities[potentialPrevIndex]
  }

  return notEmptyEntities[notEmptyEntities.length - 1]
}
