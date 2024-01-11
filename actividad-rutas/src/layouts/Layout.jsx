import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='container'>
        <Outlet>

        </Outlet>
        <footer>Hola soy el footer</footer>
    </div>
  )
}

export default Layout