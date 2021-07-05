import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import { folders, currentDate } from '../../firebase'
import { useAuth } from '../../context/AuthContext'

const AddFolderBtn = ({currentFolder}) => {
  const [openModal, setOpenModal] = useState(false)
  const [folderName, setFolderName] = useState('')
  const nameInput = useRef(null)
  const { currentUser } = useAuth()

  if (currentFolder == null) return null

  let path = [...currentFolder.path]
  currentFolder.id === null && path.push({name: 'Root', id: 1})
  currentFolder.id != null && path.push({name: currentFolder.name, id: currentFolder.id}) 

  const closeModal = () => {
    setOpenModal(false)
    setFolderName('')
  }


  const handleSubmit = (e)=> {
    e.preventDefault()

    folders.add({
      name: folderName,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: [...path],
      createdAt: currentDate()
    })
    setFolderName('')
    closeModal()

    
  }

  return (
    <div>
      <Button onClick={()=> setOpenModal(true) } variant='outline-success'>
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={openModal} onHide={closeModal} 
      onShow={ ()=> nameInput && nameInput.current.focus()}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
              <Form.Group>
                <Form.Control 
                type='text' 
                value={folderName} 
                ref={nameInput}
                required
                placeholder='Enter Folder Name'
                onChange={(e)=> setFolderName(e.target.value)}
                />
              </Form.Group>
          </Modal.Body>

          <Modal.Footer>
              <Button onClick={closeModal} variant='secondary'>Close</Button>
              <Button type='submit' variant='success'>Create</Button>
          </Modal.Footer>

        </Form>
      </Modal>
      
    </div>
  )
}

export default AddFolderBtn
