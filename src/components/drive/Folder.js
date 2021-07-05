import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"


export default function Folder({folder}) {
  return (
    <Button 
    as={Link} 
    to={{
      pathname: `/folder/${folder.id}`,
      state: {folder: folder}
    }}
    variant='outline-dark' className='text-truncate' style={{maxWidth: '200px', margin: '10px'}}>
      <FontAwesomeIcon icon={faFolder} className='mr-2' />
      {folder.name}
    </Button>
  )
}
