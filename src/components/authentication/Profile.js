import { Card, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import CenteredContainer from './CenteredContainer'

const Profile = () => {
  const {currentUser, logout} = useAuth()
  const [error, setError] = useState()
  const history = useHistory()

  const handleClick = async () => {
    setError('')
    try {
      await logout()
      history.push('/login')
    } catch {
      setError("Failed to Log out")
    }
  }
  return (
    <CenteredContainer>
      <Card style={{ width: '20rem' }}>
        {error && <Alert variant='danger'>{error}</Alert>}
        <><h2 className='text-center mt-3'>Profile</h2></>
        <Card.Body>
          <strong>Email:</strong> {currentUser.email}
        <Link to='/update-profile' className='btn btn-primary w-100 mt-4'>Update Profile</Link>
        </Card.Body>
      </Card>
        <Button variant='link' onClick={handleClick}>Log Out</Button>
      
    </ CenteredContainer>
  )
}

export default Profile
