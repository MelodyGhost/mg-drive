import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavbarDrive = () => {
  return (
    <>
      <Navbar bg="dark" variant='dark' expand="sm">
        <Navbar.Brand>My Google Drive</Navbar.Brand>
        <Nav className='ml-auto'>
          <Nav.Link as={Link} to='/profile' >
            Profile
          </Nav.Link>
        </Nav> 
      </Navbar>
    </>
  )
}

export default NavbarDrive