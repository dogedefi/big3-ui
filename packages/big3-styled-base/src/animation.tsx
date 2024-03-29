import throttle from 'lodash.throttle'
import React, { useEffect, useState, FC, useRef } from 'react'
import styled, { css } from 'big3-styled'
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

export const withFadeEffect = (Component: any, offset?: FadeAnimationOffset) => {
  offset = offset ?? '25px'
  const WrapperComponent = styled(Component)`
    opacity: 0;
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
    ${props => css`
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
    `};
  `
  const EnhancedComponent: FC<{
    selector: string
    onCheck: (intersectionRatio: number) => FadeAnimationState
    threshold: number | number[]
  } & FadeAnimation &
    typeof Component> = props => {
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

    return <WrapperComponent {...(rest as any)} state={domAnimate} placement={placement || 'top'} />
  }

  return EnhancedComponent
}

export const withButtonFadeEffect = (Component: any, offset?: FadeAnimationOffset) => {
  offset = offset ?? '25px'
  const WrapperComponent = styled(Component)`
    opacity: 0;
    @keyframes buttonFadeIn {
      0% {
        transform: translateY(calc(${offset} * 1));
        opacity: 0;
      }

      66% {
        transform: translateY(calc(${offset} * -0.333333));
        opacity: 1;
      }

      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes buttonFadeOut {
      0% {
        transform: translateY(0);
        opacity: 1;
      }

      33% {
        transform: translateY(calc(${offset} * -0.333333));
        opacity: 1;
      }

      100% {
        transform: translateY(calc(${offset} * 1));
        opacity: 0;
      }
    }
    ${props => css`
      ${props.state === 'in' &&
        css`
          animation: buttonFadeIn 0.7s linear forwards;
        `}
      ${props.state === 'out' &&
        css`
          animation: buttonFadeOut 0.7s linear forwards;
        `}
    `};
  `
  const EnhancedComponent: FC<{
    selector: string
    onCheck: (intersectionRatio: number) => FadeAnimationState
    threshold: number | number[]
  } & FadeAnimation &
    typeof Component> = props => {
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

    return <WrapperComponent {...(rest as any)} state={domAnimate} placement={placement || 'top'} />
  }

  return EnhancedComponent
}

export const withHeaderEffect = (Header: any, rgb: string /* example: '255,255,255' */, fixedOpacity = false) => {
  const EnhancedComponent: FC<{ selector: string } & Big3Props<HTMLDivElement> & typeof Header> = props => {
    const { ...rest } = props
    const headerRef = useRef<HTMLElement>(document.createElement('header'))
    rgb = rgb || '255,255,255'

    useEffect(() => {
      const callback = throttle(() => {
        if (!headerRef.current) return

        headerRef.current.style.background = fixedOpacity
          ? `rgba(${rgb}, 1)`
          : `rgba(${rgb}, ${Math.min(1, window.scrollY / 100)})`
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
