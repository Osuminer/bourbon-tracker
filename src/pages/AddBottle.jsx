import React, { useState } from "react";
import {
  Container,
  Form,
  FloatingLabel,
  Row,
  Image,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import BottleInput from "../components/AddBottleComponents/BottleInput";
import TagInput from "../components/AddBottleComponents/TagInput";
import TypeDropdown from "../components/AddBottleComponents/TypeDropdown";
import DistillerDropdown from "../components/AddBottleComponents/DistillerDropdown";
import BottlerDropdown from "../components/AddBottleComponents/BottlerDropdown";

import "./AddBottle.css";

const AddBottle = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const userId = new URLSearchParams(location.search).get('u')

  const [image, setImage] = useState("");
  const [validated, setValidated] = useState(false);

  // Form useState's
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");
  const [age, setAge] = useState("");
  const [distiller, setDistiller] = useState("");
  const [bottler, setBottler] = useState("");
  const [abv, setABV] = useState("");
  const [rating, setRating] = useState("");
  const [intro, setIntro] = useState("");
  const [nose, setNose] = useState("");
  const [taste, setTaste] = useState("");
  const [finish, setFinish] = useState("");
  const [url, setUrl] = useState("");

  // Whisky bottle object
  const whiskyData = {
    Name: name,
    Tags: tags,
    Type: type,
    Distiller: distiller === "Select Distiller..." ? "" : distiller,
    Bottler: bottler === "Select Bottler..." ? "" : bottler,
    ABV: abv,
    Age: age,
    Price: "",
    Rating: rating,
    "House Score": null,
    Date: "",
    Intro: intro,
    Nose: nose,
    Taste: taste,
    Finish: finish,
    ImageURL: url,
  };

  // Handles search button
  const handleSearch = () => {
    setImage(url);
  };

  // Handles Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSearch();
    }
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      console.log(whiskyData)
      try {
        const response = await fetch("https://api.cstasnet.com/api/whiskies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(whiskyData),
        });

        if (!response.ok) {
          console.error("Error:", response.statusText);
          return;
        }

        const data = await response.json();

        const userIdURL = userId ? `?u=${userId}` : ''

        navigate(`/whiskies/${data._id}/${userIdURL}`);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();
    } else {
      setValidated(true);
    }
  };

  return (
    <Container>
      <h1>Add Bottle</h1>
      <Form
        className="pb-5"
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        {/* Row 1 */}
        <Row className="mt-4">
          <BottleInput
            label="Bottle Name"
            placeholder="Enter bottle name..."
            className="col-12 col-md-7"
            required={true}
            onChange={(term) => setName(term)}
          />
          <TypeDropdown
            className="col-12 col-md-3 mt-3 mt-md-0"
            onChange={(term) => setType(term)}
          />
          <BottleInput
            label="Age"
            placeholder="e.g. 10 Years, 3 Years"
            className="col-12 col-md-2 mt-3 mt-md-0"
            onChange={(term) => setAge(term)}
          />
        </Row>

        {/* Row 2 */}
        <Row className="mt-3">
          <DistillerDropdown
            className="col-12 col-md-6 col-lg-3"
            onChange={(term) => setDistiller(term)}
          />
          <BottlerDropdown
            className="col-12 col-md-6 col-lg-3 mt-3 mt-md-0"
            onChange={(term) => setBottler(term)}
          />
          <BottleInput
            label="ABV"
            placeholder="Enter ABV..."
            className="col-12 col-md-6 col-lg-3 mt-3 mt-lg-0"
            onChange={(term) => setABV(term)}
          />
          <BottleInput
            label="Rating"
            placeholder="Enter rating /100..."
            tooltip="Ratings are out of 100"
            className="col-12 col-md-6 col-lg-3 mt-3 mt-lg-0"
            onChange={(term) => setRating(term)}
          />
        </Row>

        {/* Row 3 */}
        <Row className="mt-3">
          <TagInput
            label="Tags"
            placeholder="e.g. Bourbon, Woodford Reserve, Eagle Rare" 
            onChange={(term) => setTags(term)}/>
        </Row>

        {/* Row 4 */}
        <Row className="mt-3">
          <BottleInput
            label="Intro"
            placeholder="Enter intro..."
            className="col-12 col-md-6"
            type="textarea"
            onChange={(term) => setIntro(term)}
          />
          <BottleInput
            label="Nose"
            placeholder="Enter nose..."
            className="col-12 col-md-6 mt-3 mt-md-0"
            type="textarea"
            onChange={(term) => setNose(term)}
          />
          <BottleInput
            label="Taste"
            placeholder="Enter taste..."
            className="col-12 col-md-6 mt-3"
            type="textarea"
            onChange={(term) => setTaste(term)}
          />
          <BottleInput
            label="Finish"
            placeholder="Enter finish..."
            className="col-12 col-md-6 mt-3"
            type="textarea"
            onChange={(term) => setFinish(term)}
          />
        </Row>

        <hr />

        <InputGroup className="mt-3">
          <FloatingLabel label="Image URL">
            <Form.Control
              type="url"
              placeholder=""
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
            ></Form.Control>
          </FloatingLabel>
          <Button className="px-4" onClick={() => handleSearch(image)}>
            <i className="bi bi-search"></i>
          </Button>
        </InputGroup>
        <Image
          rounded
          src={image}
          className="bourbon-image shadow d-block mx-auto my-5"
        />

        <Row>
          <Button type="submit">Submit</Button>
        </Row>
      </Form>
    </Container>
  );
};

export default AddBottle;
