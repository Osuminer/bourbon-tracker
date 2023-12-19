import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const TypeDropdown = ({ required = false, onChange, className, tooltip, value }) => {
  const [typesList, setTypesList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState(value)

  useEffect(() => {
    // Set the initial state value
    if (value) {
      setSelectedType({ label: value, value: value });
    }
  }, [value]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/types`);
        const data = await response.json();
        const initialList = data.map((type) => ({ label: type, value: type }));
        setTypesList(initialList);
      } catch (error) {
        console.error("Error fetching types", error);
      }
    };

    fetchTypes();
  }, []);

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedType(selectedOption);
      onChange(selectedOption.label);
    } else {
      setSelectedType(null);
      onChange(null);
    }
  };
  

  const handleCreate = (input) => {
    const newOption = { label: input, value: input };
    setSelectedType(newOption);
    setTypesList([...typesList, newOption]);
    onChange(input);
  };

  return (
    <Form.Group as={Col} className={className}>
      {tooltip ? (
        <span>
          <Form.Label>Type</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{tooltip}</Tooltip>}
          >
            <i className="bi bi-info-circle-fill mx-2"></i>
          </OverlayTrigger>
        </span>
      ) : (
        <Form.Label>Type</Form.Label>
      )}

      <CreatableSelect
        isClearable
        options={typesList}
        value={selectedType}
        onChange={handleChange}
        onCreateOption={handleCreate}
        inputValue={inputValue}
        onInputChange={(input) => setInputValue(input)}
        placeholder="Select Type..."
        isSearchable
      />
    </Form.Group>
  );
};

export default TypeDropdown;
