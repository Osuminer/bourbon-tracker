import { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const BottlerDropdown = ({ required = false, onChange, className, tooltip, value }) => {
  const [initialBottlers, setInitialBottlers] = useState([]);
  const [bottlersList, setBottlersList] = useState([]);
  const [selectedBottler, setSelectedBottler] = useState(value);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Set the initial state value
    if (value) {
      setSelectedBottler({label: value, value: value});
    }
  }, [value]);

  useEffect(() => {
    if (selectedBottler) {
      // Trigger onChange with the label of the selected bottler
      onChange(selectedBottler.label);
    }
  }, [selectedBottler, onChange]);

  useEffect(() => {
    const fetchBottlers = async () => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/bottlers`);
        const data = await response.json();
        const initialList = data.map((type) => ({ label: type, value: type }));
        setBottlersList(initialList);
        setInitialBottlers(initialList);
      } catch (error) {
        console.error("Error fetching bottlers", error);
      }
    };
  
    fetchBottlers();
  }, []);

  const handleInputChange = (input) => {
    setInputValue(input);
  
    if (input.trim() === '') {
      // If the input is empty, reset to the initial list
      setBottlersList(initialBottlers);
      return;
    }
  
    // Fetch bottlers that match the input
    const filteredBottlers = initialBottlers.filter((option) =>
      option.label.toLowerCase().includes(input.toLowerCase())
    );
  
    // Add the input itself as an option
    if (input.trim() !== '') {
      filteredBottlers.push({ label: input, value: input });
    }
  
    setBottlersList(filteredBottlers);
  };

  return (
    <Form.Group as={Col} className={className}>
      {tooltip ? (
        <span>
          <Form.Label>Bottler</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{tooltip}</Tooltip>}
          >
            <i className="bi bi-info-circle-fill mx-2"></i>
          </OverlayTrigger>
        </span>
      ) : (
        <Form.Label>Bottler</Form.Label>
      )}

      <Select
        options={bottlersList}
        value={selectedBottler}
        onChange={(selectedOption) => setSelectedBottler(selectedOption)}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        placeholder="Select Bottler..."
        isSearchable
      />
    </Form.Group>
  );
};

export default BottlerDropdown;
