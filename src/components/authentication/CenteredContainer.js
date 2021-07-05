import { Container } from 'react-bootstrap'
import React from 'react'


const CenteredContainer = ({ children }) => {
  return (
    <Container className='d-flex flex-column justify-content-center align-items-center vh-100'>
      { children }
    </Container>
  )
}

export default CenteredContainer
