import * as React from 'react'
import NavBar from './NavBar'

const Layout: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="container">{children}</div>
    </div>
  )
}

export default Layout
