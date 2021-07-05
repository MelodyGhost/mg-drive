import { Container } from 'react-bootstrap'
import NavbarDrive from './drive/Navbar'
import AddFolderBtn from './drive/AddFolder'
import AddFileBtn from './drive/AddFileBtn'
import { useFolder } from '../hooks/useFolder'
import Folder from './drive/Folder'
import { useParams, useLocation } from 'react-router-dom'
import BreadCrumbs from './drive/BreadCrumbs'
import File from './drive/File'

const Dashboard = () => {
  const {folderId} = useParams()
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)
  return (
    <Container fluid>
      <NavbarDrive />
      <div className='d-flex align-items-center  w-100 my-3'>
        <BreadCrumbs currentFolder={folder}/>
        <AddFileBtn currentFolder={folder} />
        <AddFolderBtn currentFolder={folder}/>
      </div>
      {childFolders.length > 0 && (
        <>
          <div className="d-flex flex-wrap" >
            {childFolders.map( childFolder => <Folder key={childFolder.id} folder={childFolder} />)}
          </div>
          <hr />
        </>
      )} 
      {childFiles.length > 0 && (
        <div className="d-flex flex-wrap" >
          {childFiles.map( childFile => <File key={childFile.id} file={childFile} />)}
        </div>
      )} 
    </Container>
  )
}

export default Dashboard
