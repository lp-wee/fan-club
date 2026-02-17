import { useState, useCallback } from 'react'

interface UseAPIOptions {
  skipErrorHandling?: boolean
}

interface UseAPIState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useAPI<T = any>(options: UseAPIOptions = {}) {
  const [state, setState] = useState<UseAPIState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (fn: () => Promise<T>) => {
      setState({ data: null, loading: true, error: null })
      try {
        const result = await fn()
        setState({ data: result, loading: false, error: null })
        return result
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error))
        setState({ data: null, loading: false, error: err })
        if (!options.skipErrorHandling) {
          console.error('[useAPI] Error:', err)
        }
        throw err
      }
    },
    [options.skipErrorHandling]
  )

  return {
    ...state,
    execute,
  }
}
