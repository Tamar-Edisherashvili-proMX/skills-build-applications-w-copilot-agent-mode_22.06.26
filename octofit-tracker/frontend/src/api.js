export const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getApiUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

function firstArrayValue(payload) {
  if (!payload || typeof payload !== 'object') {
    return []
  }

  const arrays = Object.values(payload).filter(Array.isArray)
  return arrays[0] || []
}

export function extractCollection(payload, key) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[key])) {
    return payload[key]
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  return firstArrayValue(payload)
}

export async function fetchCollection(resource, key = resource) {
  return fetchCollectionFromUrl(getApiUrl(resource), key)
}

export async function fetchCollectionFromUrl(url, key) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return extractCollection(payload, key)
}