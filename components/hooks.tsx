/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

 import React, { useCallback, useEffect, useRef } from "react"

 export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    //@ts-ignore
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}


 export function useInterval(callback: () => void, delay: number) {
   const callbackRef = useRef(callback)
   const timeoutRef = useRef()
 
   useEffect(() => {
     callbackRef.current = callback
   }, [callback])
 
   const set = useCallback(() => {
    //@ts-ignore
     timeoutRef.current = setInterval(() => callbackRef.current(), delay)
   }, [delay])
 
   const clear = useCallback(() => {
     timeoutRef.current && clearInterval(timeoutRef.current)
   }, [])
 
   useEffect(() => {
     set()
     return clear
   }, [delay, set, clear])
 
   const reset = useCallback(() => {
     clear()
     set()
   }, [clear, set])
 
   return { reset, clear }
 }

 export function useDebounce(callback: () => void, delay: number, dependencies: any[]) {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}