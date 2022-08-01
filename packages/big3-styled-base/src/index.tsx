import { css } from 'wired-styled-px2vw'
import { CSSProperties } from 'react'
import kebabCase from 'lodash.kebabcase'

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
      /width|height|margin|padding|font|text|color|cursor|flex|background|transform|top|bottom|right|left/i.test(key)
    ) {
      // transform the key from camelCase to kebab-case
      const cssKey = kebabCase(key)
      // remove ' in value
      const cssValue = String(style[key as keyof CSSProperties]).replace("'", '')
      // build the result
      // you can break the line, add indent for it if you need
      if (/weight/i.test(cssKey)) {
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
  ${baseCss(props)}
  display: flex;
  flex-wrap: ${settleCss(props.wrap, 'nowrap')};
  flex-direction: ${props.column ? 'column' : 'row'};
  justify-content: ${settleCss(props.justify, 'flex-start')};
  align-items: ${settleCss(props.align, 'flex-start')};
`

export const textCss = (props: CSSProperties) => css`
  ${baseCss(props)}
  font-style: normal;
  word-break: keep-all;
  white-space: nowrap;
`
