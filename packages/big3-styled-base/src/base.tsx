import { Big3Props, FlexCss, Heading } from './interface'
import styled from 'wired-styled-px2vw'
import { baseCss, textCss, flexCss, settleCss } from '.'
import { createElement } from 'react'

export const Big3Layout = styled.div<Big3Props<HTMLDivElement>>`
  ${(props) => baseCss(props)};
`

export const Big3Header = styled.header<Big3Props<HTMLBaseElement>>`
  ${(props) => baseCss(props)};
`

export const Big3Footer = styled.header<Big3Props<HTMLBaseElement>>`
  ${(props) => baseCss(props)};
`

export const Big3Page = styled.main<Big3Props<HTMLBaseElement>>`
  ${(props) => baseCss(props)};
`

export const Big3Paragraph = styled.p<Big3Props<HTMLParagraphElement>>`
  ${(props) => textCss(props)};
  word-break: keep-all;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => `${props.rows ?? 4}`}; /* number of lines to show */
  line-clamp: ${(props) => `${props.rows ?? 4}`};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const _createHeadingElement = ({
  type = 'h1',
  children,
  ...rest
}: Big3Props<HTMLHeadingElement> & { type?: Heading }) => createElement(type, rest, children)
export const Big3Heading = styled(_createHeadingElement)`
  ${(props) => textCss(props)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Big3Link = styled.a<Big3Props<HTMLAnchorElement> & FlexCss>`
  ${(props) => textCss(props)};
  ${(props) => flexCss(props)};
  flex-shrink: 0;
`

export const Big3List = styled.ul<Big3Props<HTMLUListElement> & FlexCss>`
  ${(props) => flexCss(props)};
  max-height: ${(props) => settleCss(props.height, 'auto')};
  flex-direction: column;
  overflow: auto;
`

export const Big3ListItem = styled.li<Big3Props<HTMLLIElement> & FlexCss>`
  ${(props) => flexCss(props)};
`

export const Big3Nav = styled.nav<Big3Props<HTMLBaseElement> & FlexCss>`
  ${(props) => flexCss(props)}
`

export const Big3NavLink = styled(Big3Link)`
  transition: all 0.2s;

  &.active,
  &:hover {
    -webkit-text-stroke-width: ${(props) => settleCss(props.strokeWidth, 0.666666)};
    color: ${(props) => settleCss(props.color, 'black')};
  }
`

export const Big3Image = styled.img<Big3Props<HTMLImageElement>>`
  ${(props) => baseCss(props)}
  display: block;
  object-fit: contain;
  flex-shrink: 0;
`

export const Big3Icon = styled.img<Big3Props<HTMLImageElement>>`
  ${(props) => baseCss(props)}
  width: ${(props) => settleCss(props.size, 'auto')};
  height: ${(props) => settleCss(props.size, 'auto')};
`

export const Big3Avatar = styled.img<Big3Props<HTMLImageElement>>`
  ${(props) => baseCss(props)}
  border-radius: 50%;
`

export const Big3Box = styled.div<Big3Props<HTMLDivElement>>`
  ${(props) => baseCss(props)}
`

export const Big3FlexBox = styled.div<Big3Props<HTMLDivElement> & FlexCss>`
  ${(props) => flexCss(props)}
`
