import { useEffect, useMemo, useRef, useState } from 'react'

/** Returns a debounced copy of `value`, updating `delay`ms after it settles. */
export function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

/** Returns a stable debounced callback (with `.cancel()` and `.flush()`). */
export function useDebouncedCallback(callback, delay = 700) {
  const callbackRef = useRef(callback)
  const timer = useRef(null)
  const lastArgs = useRef([])

  useEffect(() => {
    callbackRef.current = callback
  })

  const debounced = useMemo(() => {
    const fn = (...args) => {
      lastArgs.current = args
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        timer.current = null
        callbackRef.current(...lastArgs.current)
      }, delay)
    }
    fn.cancel = () => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = null
    }
    fn.flush = () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
        callbackRef.current(...lastArgs.current)
      }
    }
    fn.isPending = () => timer.current !== null
    return fn
  }, [delay])

  useEffect(() => () => debounced.cancel(), [debounced])
  return debounced
}
