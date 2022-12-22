import { css } from 'wired-styled-px2vw'
import { CSSProperties } from 'react'
import kebabCase from 'lodash.kebabcase'
import { FlexCss } from './interface'

const a = document.createElement('a')
const img = document.createElement('img')
const p = document.createElement('p')
const allAttrKeys = Object.keys(Object.assign({}, a.style, img.style, p.style))

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
    if (allAttrKeys.includes(key)) {
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

export * from './base'
export * from './animation'
export { default as Big3PortalNode } from './components/Big3PortalNode'
