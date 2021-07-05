import {useRef, useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'



const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()
  const {signup} = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  
  const handleClick = async (e) => {
    e.preventDefault()
    setError('')

    if (passwordRef.current.value !== confirmRef.current.value) {
      return setError('Password do not match')
    }
    // setLoading(true)
    try {
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to create an account')
      setLoading(false)
    }

  }
  
  
  return (
    <CenteredContainer>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">
            Sign Up
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
            <Form.Group id='confirm'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required ref={confirmRef} />
            </Form.Group>
            <Button type='submit' disabled={loading} className='w-100'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <p className="w-100 text-center mt-2">
          Already have an account? <Link to='/login'>Log In</Link>
        </p>
      </Card>
    </CenteredContainer>
  )
}

export default Signup
