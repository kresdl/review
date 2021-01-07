import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import auth from 'lib/auth'

const Nav = styled.nav`
  background-color: rgb(24, 24, 28);
`

const Sidebar: React.FC = () => {
  const location = useLocation()
  const logout = location.pathname === '/user/logout'

  useEffect(
    () => () => void auth.signOut(), [logout]
  )

  return (
    <Nav className="nav flex-md-column text-light h-100 px-md-5 pt-md-5 py-2">
      <NavLink className="nav-link" to="/user/photos">Photos</NavLink>
      <NavLink className="nav-link" to="/user/albums">Albums</NavLink>
      <NavLink className="nav-link mb-md-4" to="/user/organize">Organizer</NavLink>
      <NavLink className="nav-link" to="/user/logout">Logout</NavLink>
    </Nav>
  )
}

export default Sidebar