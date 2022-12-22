import React, { useState, FC, useEffect } from 'react'
import { CSSProperties } from 'wired-styled-px2vw'

interface BaseProps {}

export default function withSyncCss<T extends BaseProps>(
  WrappedComponent: React.FC<T>,
  element: HTMLElement,
  cssKeys: (keyof DOMRect | any)[]
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithTheme: FC<Omit<T, keyof BaseProps>> = props => {
    // Fetch the props you want to inject. This could be done with context instead.

    // extend...
    const [css, setCss] = useState<CSSProperties>()

    useEffect(() => {
      if (element) {
        const resizeObserver = new ResizeObserver(entries => {
          const rectProps: DOMRect = entries[0].target.getClientRects()[0]
          if (rectProps) {
            setCss(
              cssKeys.reduce((css, key) => {
                css[key] = rectProps[key as keyof DOMRect]
                return css
              }, {} as DOMRect)
            )
          }
        })

        // start observing a DOM node
        resizeObserver.observe(element)
      }
    }, [element])

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...(props as T)} style={css} />
  }

  ComponentWithTheme.displayName = `withSyncCss(${displayName})`

  return ComponentWithTheme
}
