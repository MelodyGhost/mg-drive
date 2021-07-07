import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function BreadCrumbs({ currentFolder }) {
  let path = [];
  if (currentFolder) {
    path = [...currentFolder.path];
  }

  return (
    <Breadcrumb
      className="flex-grow-1"
      listProps={{ style: { backgroundColor: 'white', margin: 0, padding: 0 } }}
    >
      {path.length > 0 &&
        path.map((dir, idx) => (
          <Breadcrumb.Item
            key={dir.id}
            linkAs={Link}
            className="text-truncate"
            style={{ maxWidth: '150px' }}
            linkProps={{
              to: {
                pathname: dir.id === 1 ? '/' : `/folder/${dir.id}`,
                state: { folder: { ...dir, path: path.slice(0, idx) } },
              },
            }}
          >
            {currentFolder && dir.name}
          </Breadcrumb.Item>
        ))}

      <Breadcrumb.Item active>
        {currentFolder && currentFolder.name}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
