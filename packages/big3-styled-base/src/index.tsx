import { css, FlattenInterpolation } from 'big3-styled'
import { CSSProperties } from 'react'
import kebabCase from 'lodash.kebabcase'
import { FlexCss } from './interface'
import cssKeys from './cssKeys'

export const settleCss = (cssValue: any, _default?: any) => {
  if (!cssValue) {
    return _default
  }
  if (/^[\d\.-]+$/.test(cssValue)) {
    return `${cssValue}px;`
  }
  return cssValue
}

export const baseCss = (style: CSSProperties) => css`
  min-width: 0;
  max-width: 100%;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  ${Object.keys(style).reduce((accumulator, key) => {
    if (cssKeys.includes(key)) {
      // transform the key from camelCase to kebab-case
      const cssKey = kebabCase(key)
      // remove ' in value
      const cssValue = String(style[key as keyof CSSProperties]).replace("'", '')
      // build the result
      // you can break the line, add indent for it if you need
      if (/weight|opacity|z-index|flex/i.test(cssKey)) {
        return `${accumulator}${cssKey}:${cssValue};`
      }
      if (/webkit/i.test(cssKey)) {
        return `${accumulator}-${cssKey}:${cssValue};`
      }
      if (/^[\d\.-]+$/.test(cssValue)) {
        return `${accumulator}${cssKey}:${cssValue}px;`
      }
      return `${accumulator}${cssKey}:${cssValue};`
    }
    return accumulator
  }, '')}
`

export const flexCss = (props: CSSProperties & FlexCss) => css`
  display: flex;
  flex-wrap: ${settleCss(props.wrap, 'nowrap')};
  flex-direction: ${props.column ? 'column' : 'row'};
  justify-content: ${settleCss(props.justify, 'flex-start')};
  align-items: ${settleCss(props.align, 'flex-start')};
  ${baseCss(props)}
`

export const textCss = (props: CSSProperties) => css`
  font-style: normal;
  ${baseCss(props)}
`

export const mobileCss = (compCss: FlattenInterpolation<any>, weighting = 2) =>
  css`
    @mobile_start {
      ${'&'.repeat(weighting)} {
        ${compCss}
      }
    }
    @mobile_end;
  `

export const desktopCss = (compCss: FlattenInterpolation<any>, weighting = 2) =>
  css`
    @desktop_start {
      ${'&'.repeat(weighting)} {
        ${compCss}
      }
    }
    @desktop_end;
  `

export const allCss = (compCss: FlattenInterpolation<any>, weighting = 2) => css`
  ${'&'.repeat(weighting)} {
    ${compCss}
  }
`

export * from './base'
export * from './animation'
export { default as Big3PortalNode } from './components/Big3PortalNode'
