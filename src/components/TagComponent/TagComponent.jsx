import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import './TagComponent.css'

const TagComponent = ({ tag }) => {
  const navigate = useNavigate();
  const location = useLocation()

  const userId = new URLSearchParams(location.search).get('u');


  const handleTagClick = () => {
    let url = `/?q=${encodeURIComponent(tag)}&p=0`

    if (userId) {
      url += `&u=${userId}`
    }

    navigate(url);
  };

  return (
    <Badge pill bg="dark" className="tag py-2 px-2 my-1" onClick={handleTagClick}>{tag}</Badge>
  );
};

export default TagComponent;
