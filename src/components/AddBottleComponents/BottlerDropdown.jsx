import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const BottlerDropdown = ({ required = false, onChange, className, tooltip, value }) => {
  const [bottlersList, setBottlersList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedBottler, setSelectedBottler] = useState(value)

  useEffect(() => {
    // Set the initial state value
    if (value) {
      setSelectedBottler({ label: value, value: value });
    }
  }, [value]);

  useEffect(() => {
    const fetchBottlers = async () => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/bottlers`);
        const data = await response.json();
        const initialList = data.map((type) => ({ label: type, value: type }));
        setBottlersList(initialList);
      } catch (error) {
        console.error("Error fetching bottlers", error);
      }
    };

    fetchBottlers();
  }, []);

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedBottler(selectedOption);
      onChange(selectedOption.label);
    } else {
      setSelectedBottler(null);
      onChange(null);
    }
  };
  

  const handleCreate = (input) => {
    const newOption = { label: input, value: input };
    setSelectedBottler(newOption);
    setBottlersList([...bottlersList, newOption]);
    onChange(input);
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

      <CreatableSelect
        isClearable
        options={bottlersList}
        value={selectedBottler}
        onChange={handleChange}
        onCreateOption={handleCreate}
        inputValue={inputValue}
        onInputChange={(input) => setInputValue(input)}
        placeholder="Select Bottler..."
        isSearchable
      />
    </Form.Group>
  );
};

export default BottlerDropdown;
