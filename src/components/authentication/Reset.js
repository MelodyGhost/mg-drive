import { useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'

const Reset = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  const { reset } = useAuth()
  const [ message, setMessage ] = useState()


  const handleClick = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    setLoading(true)
    try {
      await reset(emailRef.current.value)
      setMessage('Check your email to reset password')
    } catch {
      setError('Failed to Reset')
    }
    setLoading(false)

  }


  return (
    <CenteredContainer>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">
            Reset Password
          </h2>
          <Form onSubmit={handleClick}>
            {message && <Alert variant='success'>{message}</Alert>}
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            
            
            <Button type='submit' disabled={loading} className='w-100'>
              Reset
            </Button>
          </Form>
        </Card.Body>
        <p className="w-100 text-center mt-2">
          Don't Have An Account? <Link to='/signup'>Register</Link>
        </p>
      </Card>
      <small>Go back to <Link to='login'>Log In</Link></small>
    </CenteredContainer>
  )
}

export default Reset
