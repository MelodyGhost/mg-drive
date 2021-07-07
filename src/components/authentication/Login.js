import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';
import { Center } from '@chakra-ui/react';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to Log in');
      setLoading(false);
    }
  };

  const guestLogin = () => {
    emailRef.current.value = 'test@test.com';
    passwordRef.current.value = 'password';
  };

  return (
    <CenteredContainer>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleClick}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Button type="submit" disabled={loading} className="w-100">
              Log In
            </Button>{' '}
            <Center>
              <Button
                variant="outline-secondary"
                style={{ margin: '4px auto' }}
                onClick={guestLogin}
              >
                Login as guest
              </Button>
            </Center>
          </Form>
          <p className="w-100 text-center mt-3" style={{ color: '#4A5568' }}>
            Don't Have An Account?{' '}
            <Link to="/signup">
              <span style={{ color: '#38A169' }}>Register</span>
            </Link>
          </p>
        </Card.Body>
      </Card>
      <small style={{ color: '#4A5568' }} className="mt-2">
        Forgot your password?{' '}
        <Link to="/reset-password">
          <span style={{ color: '#38A169' }}>Reset</span>
        </Link>
      </small>
    </CenteredContainer>
  );
};

export default Login;
