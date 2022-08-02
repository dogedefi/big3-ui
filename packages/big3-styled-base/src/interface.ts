import { CSSProperties } from 'wired-styled-px2vw'

export interface Big3Props<T>
  extends Omit<CSSProperties, 'width' | 'height' | 'translate' | 'color' | 'content'>,
    React.HTMLProps<T>,
    React.HTMLAttributes<T> {}

export interface FlexCss {
  wrap: string
  column: boolean
  justify: string
  align: string
}
