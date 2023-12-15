import { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const DistillerDropdown = ({ required = false, onChange, className, tooltip }) => {
  const [distillersList, setDistillersList] = useState([]);
  const [selectedDistiller, setSelectedDistiller] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [initialDistillers, setInitialDistillers] = useState([])

  useEffect(() => {
    if (selectedDistiller) {
      onChange(selectedDistiller.label);
    }
  }, [selectedDistiller, onChange]);

  useEffect(() => {
    const fetchDistillers = async () => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/distillers`);
        const data = await response.json();
        const initialList = data.map((type) => ({ label: type, value: type }));
        setDistillersList(initialList);
        setInitialDistillers(initialList);
      } catch (error) {
        console.error("Error fetching distillers", error);
      }
    };
  
    fetchDistillers();
  }, []);
  

  const handleInputChange = (input) => {
    setInputValue(input);
  
    if (input.trim() === '') {
      // If the input is empty, reset to the initial list
      setDistillersList(initialDistillers);
      return;
    }
  
    // Fetch distillers that match the input
    const filteredDistillers = initialDistillers.filter((option) =>
      option.label.toLowerCase().includes(input.toLowerCase())
    );
  
    // Add the input itself as an option
    if (input.trim() !== '') {
      filteredDistillers.push({ label: input, value: input });
    }
  
    setDistillersList(filteredDistillers);
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

      <Select
        options={distillersList}
        value={selectedDistiller}
        onChange={(selectedOption) => setSelectedDistiller(selectedOption)}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        placeholder="Select Distiller..."
        isSearchable
      />
    </Form.Group>
  );
};

export default DistillerDropdown;
