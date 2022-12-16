import { CSSProperties } from 'react'
import { Property } from 'csstype'

export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface Big3Props<T>
  extends Omit<CSSProperties, keyof React.HTMLProps<T>>,
    React.HTMLProps<T>,
    React.HTMLAttributes<T> {}

export interface FlexCss {
  column?: boolean
  wrap?: Property.FlexWrap | undefined
  justify?: Property.JustifyContent | undefined
  align?: Property.AlignItems | undefined
}

export interface Big3ExpandProps<T> extends Omit<{}, keyof (Big3Props<T> & FlexCss)> {}
