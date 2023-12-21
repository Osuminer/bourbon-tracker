import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const DistillerDropdown = ({ required = false, onChange, className, tooltip, value }) => {
  const [distillersList, setDistillersList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedDistiller, setSelectedDistiller] = useState(value)

  useEffect(() => {
    // Set the initial state value
    if (value) {
      setSelectedDistiller({ label: value, value: value });
    }
  }, [value]);

  useEffect(() => {
    const fetchDistillers = async () => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/distillers`);
        const data = await response.json();
        const initialList = data.map((type) => ({ label: type, value: type }));
        setDistillersList(initialList);
      } catch (error) {
        console.error("Error fetching distillers", error);
      }
    };

    fetchDistillers();
  }, []);

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedDistiller(selectedOption);
      onChange(selectedOption.label);
    } else {
      setSelectedDistiller(null);
      onChange(null);
    }
  };
  

  const handleCreate = (input) => {
    const newOption = { label: input, value: input };
    setSelectedDistiller(newOption);
    setDistillersList([...distillersList, newOption]);
    onChange(input);
  };

  return (
    <Form.Group as={Col} className={className}>
      {tooltip ? (
        <span>
          <Form.Label>Distiller</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{tooltip}</Tooltip>}
          >
            <i className="bi bi-info-circle-fill mx-2"></i>
          </OverlayTrigger>
        </span>
      ) : (
        <Form.Label>Distiller</Form.Label>
      )}

      <CreatableSelect
        isClearable
        options={distillersList}
        value={selectedDistiller}
        onChange={handleChange}
        onCreateOption={handleCreate}
        inputValue={inputValue}
        onInputChange={(input) => setInputValue(input)}
        placeholder="Select Distiller..."
        isSearchable
      />
    </Form.Group>
  );
};

export default DistillerDropdown;
