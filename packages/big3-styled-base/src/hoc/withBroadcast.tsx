import React from 'react'
import { FC, useEffect, useRef } from 'react'

interface BaseProps {}

const SPEED = 50 // 10px/500ms
const RETENTION = 3000 // duration of retention

export default function withBroadcast<T extends BaseProps>(WrappedComponent: React.FC<T>) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithTheme: FC<Omit<T, keyof BaseProps>> = props => {
    // Fetch the props you want to inject. This could be done with context instead.

    // extend...
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
      let hovered = false
      const offset = elementRef.current!.scrollWidth - elementRef.current!.clientWidth

      const mouseoverCallback = () => {
        hovered = true

        let intervalKey: NodeJS.Timeout | null = null
        const fn = () => {
          if (intervalKey) {
            clearInterval(intervalKey)
            intervalKey = null
          }

          intervalKey = setInterval(() => {
            if (!hovered) {
              clearInterval(intervalKey as NodeJS.Timeout)
              intervalKey = null
              if (elementRef.current) {
                elementRef.current.scrollLeft = 0
              }
              return
            }

            if (elementRef.current!.scrollLeft === offset) {
              clearInterval(intervalKey as NodeJS.Timeout)
              return setTimeout(() => {
                elementRef.current!.scrollLeft = 0
                setTimeout(fn, Math.floor(RETENTION / 5))
              }, RETENTION)
            }
            elementRef.current!.scrollLeft += 1

            return // fix warning
          }, SPEED)
        }
        fn()
      }

      const mouseoutCallback = () => {
        hovered = false
      }

      elementRef?.current?.addEventListener?.('mouseover', mouseoverCallback)
      elementRef?.current?.addEventListener?.('mouseout', mouseoutCallback)
      return () => {
        elementRef?.current?.removeEventListener?.('mouseover', mouseoutCallback)
        elementRef?.current?.removeEventListener?.('mouseout', mouseoutCallback)
      }
    }, [])

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent ref={elementRef} {...(props as T)} />
  }

  ComponentWithTheme.displayName = `withBroadcast(${displayName})`

  return ComponentWithTheme
}
