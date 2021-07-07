import { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const { updateEmail, updatePassword, currentUser } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    setError('');

    if (passwordRef.current.value !== confirmRef.current.value) {
      return setError('Password do not match');
    }
    setLoading(true);
    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setError('Failed to update profile');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CenteredContainer>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          <Form onSubmit={handleClick}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep it unchanged"
              />
            </Form.Group>
            <Form.Group id="confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmRef}
                placeholder="Leave blank to keep it unchanged"
              />
            </Form.Group>
            <Button type="submit" disabled={loading} className="w-100">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <p>
        <Link to="/">Cancell</Link>
      </p>
    </CenteredContainer>
  );
};

export default UpdateProfile;
