import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Trip() {
  return (
    <div>
      <ul>
        <li><NavLink to="/trip/planning">Planificar</NavLink></li>
        <li><NavLink to="/trip/mytrips">Mis Planes</NavLink></li>
      </ul>
      <Outlet />
    </div>
  )
}