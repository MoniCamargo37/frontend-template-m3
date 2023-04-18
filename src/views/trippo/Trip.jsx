import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Trip() {
  return (
    <div >
      <div className='trip'>
      <ul>
        <li><NavLink to="/planning">Planificar</NavLink></li>
        <li><NavLink to="/trip/mis-viajes">Mis Planes</NavLink></li>
      </ul>
      </div>
      <Outlet />
    </div>
  )
}



