export function onClickOutside(element: HTMLElement, cb: () => void) {
  return (e: Event): void => {
    const target = e.target as HTMLElement

    if (target !== element && !element.contains(target)) {
      cb()
    }
  }
}

export function onEsc(cb: () => void) {
  return (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      cb()
    }
  }
}

export function portal(
  node: HTMLElement,
  to: HTMLElement = document.body,
): void {
  if (node) {
    to.append(node)
  }
}
