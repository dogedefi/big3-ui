import { Big3ExpandProps, Big3Props } from 'interface'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import ReactDOM from 'react-dom'
import { Big3Box } from '../../base'

interface Big3PortalNodeProps {
  container?: HTMLElement | Function
}

const Big3PortalNode: FC<Big3PortalNodeProps & Big3Props<HTMLDivElement>> = props => {
  const { children, container, ...rest } = props
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ;(function checkIfMounted() {
      if (typeof container === 'function') {
        const dom = container()
        if (!!dom) {
          setMounted(true)
        } else {
          setTimeout(checkIfMounted, 200)
        }
      } else {
        setMounted(!!container)
      }
    })()
  }, [container])

  return mounted
    ? ReactDOM.createPortal(
        <Big3Box {...(rest as Big3ExpandProps<HTMLDivElement>)}>{children}</Big3Box>,
        typeof container === 'function' ? container() : container || document.body
      )
    : null
}

Big3PortalNode.displayName = Big3PortalNode.name

export default Big3PortalNode
