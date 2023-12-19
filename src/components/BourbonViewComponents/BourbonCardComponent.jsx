import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffect, useState } from "react";

import TagComponent from "../TagComponent/TagComponent";
import BourbonLabelComponent from "./BourbonLabelComponent";
import WishlistCollectionButtons from "./WishlistCollectionButtons";

import "./BourbonCardComponent.css";
import { useNavigate } from "react-router-dom";

const BourbonCardComponent = ({ whisky, userId }) => {
  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Card className={`main-card mx-auto shadow ${show ? "fade-in" : ""}`}>
      <div className="centered-image">
        <TransformWrapper>
          <TransformComponent>
            <Card.Img src={whisky.ImageURL}></Card.Img>
          </TransformComponent>
        </TransformWrapper>
        <Button variant="light" onClick={() => {
          const url = userId ? `?u=${userId}` : ''

          navigate(`/edit/${whisky._id}/${url}`)
        }}>
          <span>
            {/* Edit */}
            <i class="bi bi-pencil-square"></i>
          </span>
        </Button>
      </div>
      <ListGroup variant="flush">
        <ListGroupItem>
          {whisky.Tags.map((tag, index) => (
            <TagComponent tag={tag} key={index} />
          ))}
        </ListGroupItem>

        <BourbonLabelComponent whisky={whisky} />
        {userId !== "0" && userId && (
          <ListGroupItem>
            <WishlistCollectionButtons whisky={whisky} />
          </ListGroupItem>
        )}
      </ListGroup>
    </Card>
  );
};

export default BourbonCardComponent;
