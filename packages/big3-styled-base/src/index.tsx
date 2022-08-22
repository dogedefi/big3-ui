import { css } from 'wired-styled-px2vw'
import { CSSProperties } from 'react'
import kebabCase from 'lodash.kebabcase'
import { FlexCss } from './interface'

export const settleCss = (source: any, _default?: any) => {
  _default = typeof _default === 'number' ? `${_default}px` : _default
  if (typeof source === 'number') {
    return source ? `${source}px` : _default
  }
  if (typeof source === 'string') {
    return source ?? _default
  }
  return source ?? _default
}

export const baseCss = (style: CSSProperties) => css`
  min-width: 0;
  max-width: 100%;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  ${Object.keys(style).reduce((accumulator, key) => {
    if (
      /visibility|grid|word|white|box|border|justify|align|scroll|display|width|height|margin|padding|font|text|color|cursor|flex|background|transform|top|bottom|right|left|position|overflow|transition|opacity|animation|zindex/i.test(
        key
      )
    ) {
      // transform the key from camelCase to kebab-case
      const cssKey = kebabCase(key)
      // remove ' in value
      const cssValue = String(style[key as keyof CSSProperties]).replace("'", '')
      // build the result
      // you can break the line, add indent for it if you need
      if (/weight|opacity|z-index|flex/i.test(cssKey)) {
        return `${accumulator}${cssKey}:${cssValue};`
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
  word-break: ${settleCss(props.wordBreak, 'keep-all')};
  white-space: ${settleCss(props.whiteSpace, 'nowrap')};
  ${baseCss(props)}
`

export * from './base'
export * from './animation'
export { default as Big3PortalNode } from './components/Big3PortalNode'
