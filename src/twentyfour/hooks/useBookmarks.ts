import { useCallback, useState } from 'react'

const STORAGE_KEY = 'tf_bookmarks'

function loadBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveBookmarks(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {}
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(loadBookmarks)

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks])

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
      saveBookmarks(next)
      return next
    })
  }, [])

  return { bookmarks, isBookmarked, toggleBookmark }
}
