import React from 'react'
import { Header } from '.'

const Layout = ({children, post}) => {
  return (
        <>
            <Header post={post} />
            {children}
        </>
  )
}

export default Layout