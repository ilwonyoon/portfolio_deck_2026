async function requestDeckUpdate(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Failed to update deck manifest')
  }
}

export async function deleteSlideFromDeck(slideId: string) {
  await requestDeckUpdate(`/__deck-editor/slides/${encodeURIComponent(slideId)}`, {
    method: 'DELETE',
  })
}

export async function reorderDeckSlides(orderedIds: string[]) {
  await requestDeckUpdate('/__deck-editor/reorder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderedIds }),
  })
}
