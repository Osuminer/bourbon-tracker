import { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const TypeDropdown = ({ required = false, onChange, className, tooltip }) => {
  const [typesList, setTypesList] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [initialTypes, setInitialTypes] = useState([])

  useEffect(() => {
    if (selectedType) {
      onChange(selectedType.label);
    }
  }, [selectedType, onChange]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/types`);
        const data = await response.json();
        const initialList = data.map((type) => ({ label: type, value: type }));
        setTypesList(initialList);
        setInitialTypes(initialList);
      } catch (error) {
        console.error("Error fetching types", error);
      }
    };
  
    fetchTypes();
  }, []);
  

  const handleInputChange = (input) => {
    setInputValue(input);
  
    if (input.trim() === '') {
      // If the input is empty, reset to the initial list
      setTypesList(initialTypes);
      return;
    }
  
    // Fetch types that match the input
    const filteredTypes = initialTypes.filter((option) =>
      option.label.toLowerCase().includes(input.toLowerCase())
    );
  
    // Add the input itself as an option
    if (input.trim() !== '') {
      filteredTypes.push({ label: input, value: input });
    }
  
    setTypesList(filteredTypes);
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

      <Select
        options={typesList}
        value={selectedType}
        onChange={(selectedOption) => setSelectedType(selectedOption)}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        placeholder="Select Type..."
        isSearchable
      />
    </Form.Group>
  );
};

export default TypeDropdown;
