import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import { Outlet } from 'react-router-dom'

export default function NavbarLayout() {
  return (
      <div className="flex">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
  )
}
