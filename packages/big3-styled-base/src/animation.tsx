import throttle from 'lodash.throttle'
import React, { useEffect, useState, FC, useRef } from 'react'
import styled, { css } from 'wired-styled-px2vw'
import { Big3Props } from './interface'

const watchIntersectionRatio = (selector: string, callback: Function, intersectionRatio: number | number[]) => {
  const elm = document.querySelector<HTMLElement>(selector)
  if (elm) {
    const observer = new IntersectionObserver(([e]) => callback(e), { threshold: intersectionRatio })
    observer.observe(elm)
  }
}

export type FadeAnimationState = 'out' | 'in'
export type FadeAnimationPlacement = 'top' | 'bottom'
export type FadeAnimationOffset = number | string

export interface FadeAnimation {
  delay?: number
  state?: FadeAnimationState
  placement?: FadeAnimationPlacement
}

const keyframesCss = (offset: FadeAnimationOffset) => css`
  @keyframes textTopFadeIn {
    from {
      transform: translateY(calc(${offset} * -1));
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes textTopFadeOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    to {
      transform: translateY(calc(${offset} * -1));
      opacity: 0;
    }
  }

  @keyframes textBottomFadeIn {
    from {
      transform: translateY(${offset});
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes textBottomFadeOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    to {
      transform: translateY(${offset});
      opacity: 0;
    }
  }
`

const effectCss = (props: FadeAnimation) => css`
  ${props.state === 'in' &&
  props.placement === 'top' &&
  css`
    animation: textTopFadeIn 0.7s ease-in forwards;
  `}
  ${props.state === 'out' &&
  props.placement === 'top' &&
  css`
    animation: textTopFadeOut 0.7s ease-in forwards;
  `}

    ${props.state === 'in' &&
  props.placement === 'bottom' &&
  css`
    animation: textBottomFadeIn 0.7s ease-in forwards;
  `}
    ${props.state === 'out' &&
  props.placement === 'bottom' &&
  css`
    animation: textBottomFadeOut 0.7s ease-in forwards;
  `}
`

export const withFadeEffect = (Component: any, offset?: FadeAnimationOffset) => {
  const WrapperComponent = styled(Component)`
    opacity: 0;
    ${keyframesCss(offset || '25px')};
    ${(props) => effectCss(props)};
  `
  const EnhancedComponent: FC<
    {
      selector: string
      onCheck: (intersectionRatio: number) => FadeAnimationState
      threshold: number | number[]
    } & FadeAnimation &
      typeof Component
  > = (props) => {
    const [domAnimate, setDomAnimate] = useState<FadeAnimationState | null>(null)
    const { selector, onCheck, threshold, placement, delay, ...rest } = props

    useEffect(() => {
      watchIntersectionRatio(
        selector,
        (e: IntersectionObserverEntry) =>
          setTimeout(
            () =>
              setDomAnimate(onCheck ? onCheck(e.intersectionRatio) : () => (e.intersectionRatio < 0.1 ? 'out' : 'in')),
            delay * 1000
          ),
        threshold || [1, 0.1]
      )
    }, [delay])

    return <WrapperComponent {...(rest as any)} state={domAnimate} placement={placement || 'top'} delay={0} />
  }

  return EnhancedComponent
}

export const withHeaderEffect = (Header: any, background = 'rgba(255, 255, 255, 1)') => {
  const EnhancedComponent: FC<{ selector: string } & Big3Props<HTMLDivElement> & typeof Header> = (props) => {
    const { ...rest } = props
    const headerRef = useRef<HTMLElement>(document.createElement('header'))

    useEffect(() => {
      const callback = throttle(() => {
        headerRef.current.style.background = location.pathname.startsWith('/dapp')
          ? background
          : `${background}, ${Math.min(1, window.scrollY / 100)})`
        headerRef.current.style.boxShadow = `2px 2px 14px rgba(211, 198, 252, ${Math.min(0.43, window.scrollY / 100)})`
      }, 100)

      callback()

      window.addEventListener('wheel', callback)
      window.addEventListener('touchstart', callback, { passive: false, capture: true })
      window.addEventListener('touchmove', callback, { passive: false, capture: true })
      window.addEventListener('load', callback)
      return () => {
        window.removeEventListener('wheel', callback)
        window.removeEventListener('touchstart', callback)
        window.removeEventListener('touchmove', callback)
        window.removeEventListener('load', callback)
      }
    }, [location])

    return <Header ref={headerRef} {...(rest as any)} />
  }

  return EnhancedComponent
}
