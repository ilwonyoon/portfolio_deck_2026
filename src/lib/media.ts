const mediaBaseUrl = import.meta.env.VITE_MEDIA_BASE_URL?.replace(/\/$/, '')

export function resolveMediaUrl(path?: string) {
  if (!path) {
    return undefined
  }

  if (/^(https?:)?\/\//.test(path)) {
    return path
  }

  if (path.startsWith('/')) {
    return mediaBaseUrl ? `${mediaBaseUrl}${path}` : path
  }

  return mediaBaseUrl ? `${mediaBaseUrl}/${path}` : `/media/${path}`
}
