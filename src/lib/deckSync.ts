type DeckLocationPayload = {
  slideId: string
  step: number
}

type DeckOrderPayload = {
  orderedIds: string[]
}

type DeckSyncMessage =
  | {
      payload: DeckLocationPayload
      type: 'location'
    }
  | {
      payload: DeckOrderPayload
      type: 'order'
    }

const CHANNEL_NAME = 'portfolio-deck-sync'
const LOCATION_KEY = 'portfolio-deck-sync:location'
const ORDER_KEY = 'portfolio-deck-sync:order'

function createChannel() {
  if (typeof window === 'undefined' || !('BroadcastChannel' in window)) {
    return null
  }

  return new BroadcastChannel(CHANNEL_NAME)
}

function writeSnapshot(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function readSnapshot<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  const rawValue = window.localStorage.getItem(key)
  if (!rawValue) return null

  try {
    return JSON.parse(rawValue) as T
  } catch {
    return null
  }
}

export function publishDeckLocation(payload: DeckLocationPayload) {
  writeSnapshot(LOCATION_KEY, payload)

  const channel = createChannel()
  channel?.postMessage({ payload, type: 'location' } satisfies DeckSyncMessage)
  channel?.close()
}

export function publishDeckOrder(payload: DeckOrderPayload) {
  writeSnapshot(ORDER_KEY, payload)

  const channel = createChannel()
  channel?.postMessage({ payload, type: 'order' } satisfies DeckSyncMessage)
  channel?.close()
}

export function readDeckOrderSnapshot() {
  return readSnapshot<DeckOrderPayload>(ORDER_KEY)
}

export function subscribeDeckSync(
  callback: (message: DeckSyncMessage) => void,
) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const channel = createChannel()
  const handleChannelMessage = (event: MessageEvent<DeckSyncMessage>) => {
    callback(event.data)
  }
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== LOCATION_KEY && event.key !== ORDER_KEY) return
    if (!event.newValue) return

    try {
      const payload = JSON.parse(event.newValue) as unknown
      callback({
        payload,
        type: event.key === LOCATION_KEY ? 'location' : 'order',
      } as DeckSyncMessage)
    } catch {
      // Ignore invalid snapshots from stale browser storage.
    }
  }

  channel?.addEventListener('message', handleChannelMessage)
  window.addEventListener('storage', handleStorage)

  return () => {
    channel?.removeEventListener('message', handleChannelMessage)
    channel?.close()
    window.removeEventListener('storage', handleStorage)
  }
}
