import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import './TagComponent.css'

const TagComponent = ({ tag }) => {
  const navigate = useNavigate();

  const handleTagClick = () => {
    navigate(`/?q=${encodeURIComponent(tag)}`);
  };

  return (
    <Badge pill bg="dark" className="tag py-2 px-2 my-1" onClick={handleTagClick}>{tag}</Badge>
  );
};

export default TagComponent;
