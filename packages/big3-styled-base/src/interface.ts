import { CSSProperties } from 'react'
import { Property } from 'csstype'

export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface Big3Props<T>
  extends Omit<CSSProperties, 'width' | 'height' | 'translate' | 'color' | 'content'>,
    React.HTMLProps<T>,
    React.HTMLAttributes<T> {}

export interface FlexCss {
  column: boolean
  wrap: Property.FlexWrap | undefined
  justify: Property.JustifyContent | undefined
  align: Property.AlignItems | undefined
}
