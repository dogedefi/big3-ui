import { Big3Props, FlexCss, Heading } from './interface'
import styled, { css } from 'wired-styled-px2vw'
import { baseCss, textCss, flexCss, settleCss } from '.'
import { createElement, FC } from 'react'

export const Big3Layout = styled.div<Big3Props<HTMLDivElement>>`
  ${props => baseCss(props)};
`

export const Big3Header = styled.header<Big3Props<HTMLBaseElement>>`
  ${props => baseCss(props)};
`

export const Big3Footer = styled.footer<Big3Props<HTMLBaseElement>>`
  ${props => baseCss(props)};
`

export const Big3Page = styled.main<Big3Props<HTMLBaseElement>>`
  ${props => baseCss(props)};
`

export const Big3Paragraph = styled.p<Big3Props<HTMLParagraphElement>>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
  ${props => textCss(props)};
  -webkit-line-clamp: ${props => `${props.rows ?? 4}`}; /* number of lines to show */
  line-clamp: ${props => `${props.rows ?? 4}`};
`

export const Big3Text = styled.span<Big3Props<HTMLSpanElement>>`
  display: inline-block;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
  ${props => textCss(props)}
`

const _createHeadingElement = ({
  type = 'h1',
  children,
  ...rest
}: Big3Props<HTMLHeadingElement> & { type?: Heading }) => createElement(type, rest, children)
export const Big3Heading = styled(_createHeadingElement)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${props => textCss(props)};
`

export const Big3Link = styled.a<Big3Props<HTMLAnchorElement> & FlexCss>`
  flex-shrink: 0;
  ${props => flexCss(props)};

  &.active,
  &:hover {
    -webkit-text-stroke-width: ${props => settleCss(props.strokeWidth, 0.666666)};
    color: ${props => settleCss(props.color, 'black')};
  }
`

export const Big3List = styled.ul.attrs({ column: true })<Big3Props<HTMLUListElement> & FlexCss>`
  max-height: auto;
  overflow: auto;
  ${props => flexCss(props)};
`

export const Big3ListItem = styled.li<Big3Props<HTMLLIElement> & FlexCss>`
  ${props => flexCss(props)};
`

export const Big3Nav = styled.nav<Big3Props<HTMLBaseElement> & FlexCss & { activeColor: string }>`
  ${props => flexCss(props)}
  ${props =>
    props.activeColor &&
    css`
      > a.active {
        color: ${props.activeColor};
      }
    `};
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
  display: block;
  object-fit: contain;
  flex-shrink: 0;
  ${props => baseCss(props)}
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
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
`

export const Big3SnapPage = styled.div<Big3Props<HTMLDivElement>>`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-align: center;
  ${props => baseCss(props)}
`
