import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FloatingLabel,
  Row,
  Image,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import BottleInput from "../components/AddBottleComponents/BottleInput";
import TypeDropdown from "../components/AddBottleComponents/TypeDropdown";
import DistillerDropdown from "../components/AddBottleComponents/DistillerDropdown";
import BottlerDropdown from "../components/AddBottleComponents/BottlerDropdown";

import "./AddBottle.css";

const EditBottle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const userId = new URLSearchParams(location.search).get("u");

  const [image, setImage] = useState("");
  const [validated, setValidated] = useState(false);
  const [whisky, setWhisky] = useState("");

  // Form useState's
  const [name, setName] = useState("");
  const [type, setType] = useState("");
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

  useEffect(() => {
    // Function to fetch whisky by id
    const fetchWhisky = async () => {
      let url;
  
      if (userId !== "0" && userId) {
        url = `https://api.cstasnet.com/api/whiskies/${id}/${userId}`;
      } else {
        url = `https://api.cstasnet.com/api/whiskies/${id}`;
      }
      
      try {
        const response = await fetch(url);
        const data = await response.json();

        setWhisky(data)
  
      } catch (error) {
        console.error("Error fetching whisky:", error);
      }
    };
    
    fetchWhisky();
  }, [id, userId]);

  useEffect(() => {
    setName(whisky.Name)
    setType(whisky.Type)
    setDistiller(whisky.Distiller)
    setBottler(whisky.Bottler)
    setABV(whisky.ABV)
    setAge(whisky.Age)
    setRating(whisky.Rating)
    setIntro(whisky.Intro)
    setNose(whisky.Nose)
    setTaste(whisky.Taste)
    setFinish(whisky.Finish)
    setUrl(whisky.ImageURL)

  }, [whisky])

  // Function to create tags based on distiller and bottler
  const createTags = () => {
    const tagList = [type];

    if (distiller !== "Select Distiller...") {
      tagList.push(distiller);
    }

    if (bottler !== distiller && bottler !== "Select Bottler...") {
      tagList.push(bottler);
    }

    return tagList;
  };

  // Whisky bottle object
  const whiskyData = {
    Name: name,
    Tags: createTags(),
    Type: type,
    Distiller: (distiller === "Select Distiller..." ? "" : distiller),
    Bottler: (bottler === "Select Bottler..." ? "" : bottler),
    ABV: abv,
    Age: age,
    Price: null || whisky.Price,
    Rating: rating,
    "House Score": null || whisky["House Score"],
    Date: null || whisky.Date,
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

  // Handles form submit
  const handleSubmit = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      // try {
      //   const response = await fetch(`https://api.cstasnet.com/api/whiskies/${id}`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(whiskyData),
      //   });

      //   if (!response.ok) {
      //     console.error("Error:", response.statusText);
      //     return;
      //   }

      //   // const data = await response.json();

      //   navigate(`/whiskies/${id}`);
      // } catch (error) {
      //   console.error("Error:", error);
      // }

      console.log(whiskyData)
    }

    if (e.key === "Enter") {
      e.preventDefault();
    } else {
      setValidated(true);
    }
  };

  return (
    <Container>
      <h1>Edit Bottle</h1>
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
            required={false}
            value={name}
            onChange={(term) => setName(term)}
          />
          <TypeDropdown
            className="col-12 col-md-3 mt-3 mt-md-0"
            value={type}
            onChange={(term) => setType(term)}
          />
          <BottleInput
            label="Age"
            placeholder="e.g. 10 Years, 3 Years"
            className="col-12 col-md-2 mt-3 mt-md-0"
            value={age}
            onChange={(term) => {
              console.log(term)
              setAge(term)
            }}
          />
        </Row>

        {/* Row 2
				<Row className="mt-3">
					<Form.Group as={Col} className="col-sm-12">
						<span>
							<Form.Label>Tags</Form.Label>
							<OverlayTrigger
								placement="right"
								overlay={
									<Tooltip>Press the Enter key after typing to add tag</Tooltip>
								}>
								<i class="bi bi-info-circle-fill mx-2"></i>
							</OverlayTrigger>
						</span>
						<Form.Control placeholder="e.g. Bourbon, Woodford Reserve, Eagle Rare"></Form.Control>
					</Form.Group>
				</Row> */}

        {/* Row 3 */}
        <Row className="mt-3">
          <DistillerDropdown
            className="col-12 col-md-6 col-lg-3"
            value={distiller}
            onChange={(term) => setDistiller(term)}
          />
          <BottlerDropdown
            className="col-12 col-md-6 col-lg-3 mt-3 mt-md-0"
            value={whisky.Bottler}
            onChange={(term) => setBottler(term)}
          />
          <BottleInput
            label="ABV"
            placeholder="Enter ABV..."
            className="col-12 col-md-6 col-lg-3 mt-3 mt-lg-0"
            value={abv}
            onChange={(term) => setABV(term)}
          />
          <BottleInput
            label="Rating"
            placeholder="Enter rating /100..."
            tooltip="Ratings are out of 100"
            className="col-12 col-md-6 col-lg-3 mt-3 mt-lg-0"
            value={rating}
            onChange={(term) => setRating(term)}
          />
        </Row>

        {/* Row 4 */}
        <Row className="mt-3">
          <BottleInput
            label="Intro"
            placeholder="Enter intro..."
            className="col-12 col-md-6"
            type="textarea"
            value={intro}
            onChange={(term) => setIntro(term)}
          />
          <BottleInput
            label="Nose"
            placeholder="Enter nose..."
            className="col-12 col-md-6 mt-3 mt-md-0"
            type="textarea"
            value={nose}
            onChange={(term) => setNose(term)}
          />
          <BottleInput
            label="Taste"
            placeholder="Enter taste..."
            className="col-12 col-md-6 mt-3"
            type="textarea"
            value={taste}
            onChange={(term) => setTaste(term)}
          />
          <BottleInput
            label="Finish"
            placeholder="Enter finish..."
            className="col-12 col-md-6 mt-3"
            type="textarea"
            value={finish}
            onChange={(term) => setFinish(term)}
          />
        </Row>

        <hr />

        <InputGroup className="mt-3">
          <FloatingLabel label="Image URL">
            <Form.Control
              type="url"
              placeholder=""
              defaultValue={url}
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

export default EditBottle;
