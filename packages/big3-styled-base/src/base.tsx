import { Big3Props, FlexCss, Heading } from './interface'
import styled from 'wired-styled-px2vw'
import { baseCss, textCss, flexCss, settleCss } from '.'
import { createElement, FC } from 'react'

export const Big3Layout = styled.div<Big3Props<HTMLDivElement>>`
  ${props => baseCss(props)};
`

export const Big3Header = styled.header<Big3Props<HTMLBaseElement>>`
  ${props => baseCss(props)};
`

export const Big3Footer = styled.header<Big3Props<HTMLBaseElement>>`
  ${props => baseCss(props)};
`

export const Big3Page = styled.main<Big3Props<HTMLBaseElement>>`
  ${props => baseCss(props)};
`

export const Big3Paragraph = styled.p<Big3Props<HTMLParagraphElement>>`
  ${props => textCss(props)};
  word-break: keep-all;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: ${props => `${props.rows ?? 4}`}; /* number of lines to show */
  line-clamp: ${props => `${props.rows ?? 4}`};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Big3Text = styled.span<Big3Props<HTMLSpanElement>>`
  ${props => textCss(props)}
  display: ${props => settleCss(props.display, 'inline-block')};
  flex-shrink: 0;
`

const _createHeadingElement = ({
  type = 'h1',
  children,
  ...rest
}: Big3Props<HTMLHeadingElement> & { type?: Heading }) => createElement(type, rest, children)
export const Big3Heading = styled(_createHeadingElement)`
  ${props => textCss(props)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Big3Link = styled.a<Big3Props<HTMLAnchorElement> & FlexCss>`
  ${props => textCss(props)};
  ${props => flexCss(props)};
  flex-shrink: 0;
`

export const Big3List = styled.ul<Big3Props<HTMLUListElement> & FlexCss>`
  ${props => flexCss(props)};
  max-height: ${props => settleCss(props.height, 'auto')};
  flex-direction: column;
  overflow: auto;
`

export const Big3ListItem = styled.li<Big3Props<HTMLLIElement> & FlexCss>`
  ${props => flexCss(props)};
`

export const Big3Nav = styled.nav<Big3Props<HTMLBaseElement> & FlexCss>`
  ${props => flexCss(props)}
`

export const Big3NavLink = styled(Big3Link)`
  transition: all 0.2s;

  &.active,
  &:hover {
    -webkit-text-stroke-width: ${props => settleCss(props.strokeWidth, 0.666666)};
    color: ${props => settleCss(props.color, 'black')};
  }
`

export const Big3Image: FC<Big3Props<HTMLImageElement>> = styled.img`
  ${props => baseCss(props)}
  display: block;
  object-fit: contain;
  flex-shrink: 0;
`

export const Big3Icon = styled(Big3Image)`
  width: ${props => settleCss(props.size, 'auto')};
  height: ${props => settleCss(props.size, 'auto')};
`

export const Big3Avatar = styled(Big3Icon)`
  border-radius: 50%;
`

export const Big3Box = styled.div<Big3Props<HTMLDivElement>>`
  ${props => baseCss(props)}
`

export const Big3FlexBox = styled.div<Big3Props<HTMLDivElement> & FlexCss>`
  ${props => flexCss(props)}
`

export const Big3SnapContainer = styled.div<Big3Props<HTMLDivElement>>`
  ${props => baseCss(props)}
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
`

export const Big3SnapPage = styled.div<Big3Props<HTMLDivElement>>`
  ${props => baseCss(props)}
  height: 100vh;
  overflow-y: auto;
  scroll-snap-align: center;
`
