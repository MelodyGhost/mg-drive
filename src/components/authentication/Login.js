import { useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'

const Login = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault()
    
    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to Log in')
      setLoading(false)
    }

  }

  return (
    <CenteredContainer>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">
            Log In
          </h2>
          <Form onSubmit={handleClick}>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            
            <Button type='submit' disabled={loading} className='w-100'>
              Log In
            </Button>
          </Form>
        </Card.Body>
        <p className="w-100 text-center mt-2">
          Don't Have An Account? <Link to='/signup'>Register</Link>
        </p>
      </Card>
      <small >Forgot your password? <Link to='/reset-password'>Reset</Link></small>
    </CenteredContainer>
  )
}

export default Login
