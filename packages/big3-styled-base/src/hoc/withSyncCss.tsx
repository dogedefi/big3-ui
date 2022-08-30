import React, { FC, useEffect, useState } from 'react'
import styled, { CSSProperties } from 'wired-styled-px2vw'

type DOMRectKey = 'height' | 'width' | 'x' | 'y'

const withSyncCss = <T extends unknown>(Component: T, selector: string, cssKeys: DOMRectKey[]) => {
  const WrapperComponent = styled(Component as any)``
  const EnhancedComponent: FC<T> = (props: any) => {
    const [css, setCss] = useState<CSSProperties>()

    useEffect(() => {
      const target = document.querySelector(selector)
      if (target) {
        const resizeObserver = new ResizeObserver(entries => {
          const rectProps = entries[0].target.getClientRects()[0]
          const { highestWeightProps } = props
          if (rectProps) {
            setCss(
              cssKeys.reduce((css, key) => {
                if (!highestWeightProps?.includes(key)) {
                  css[key] = rectProps[key]
                }
                return css
              }, {} as DOMRect)
            )
          }
        })

        // start observing a DOM node
        resizeObserver.observe(target)
      }
    }, [selector])

    return <WrapperComponent {...(props as any)} style={css} />
  }

  return EnhancedComponent
}

export default withSyncCss
