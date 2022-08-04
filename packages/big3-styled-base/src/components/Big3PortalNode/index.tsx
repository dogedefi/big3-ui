import React from 'react'
import { Big3Props } from '../../interface'
import { FC } from 'react'
import ReactDOM from 'react-dom'
import { Big3Box } from '../../base'

interface Big3PortalNode extends Big3Props<HTMLDivElement> {
  container?: HTMLElement
}

const Big3PortalNode: FC<Big3PortalNode> = (props) => {
  const { children, container, ...rest } = props
  return ReactDOM.createPortal(<Big3Box {...(rest as any)}>{children}</Big3Box>, container || document.body)
}

Big3PortalNode.displayName = Big3PortalNode.name

export default Big3PortalNode
