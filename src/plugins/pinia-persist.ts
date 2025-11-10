import type { PiniaPluginContext } from 'pinia'

export function piniaPersist({ store }: PiniaPluginContext) {
  const storageKey = `pinia-${store.$id}`

  // Только сохраняем при изменениях (загрузка уже в store.state())
  let timer: number | null = null
  store.$subscribe((mutation, state) => {
    if (mutation.type === 'direct') {
      if (timer)
        clearTimeout(timer)
      timer = window.setTimeout(() => {
        localStorage.setItem(storageKey, JSON.stringify({ tasks: state.tasks }))
      }, 500)
    }
  })
}
