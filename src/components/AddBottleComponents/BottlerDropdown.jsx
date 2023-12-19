import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const BottlerDropdown = ({ required = false, onChange, className, tooltip, value }) => {
  const [bottlersList, setBottlersList] = useState([]);
  const [inputValue, setInputValue] = useState('');

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
    onChange(selectedOption.label);
  };

  const handleCreate = (input) => {
    setBottlersList([...bottlersList, { label: input, value: input }]);
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
        options={bottlersList}
        onChange={handleChange}
        onCreateOption={handleCreate}
        inputValue={inputValue}
        onInputChange={(input) => setInputValue(input)}
        placeholder="Select or create Bottler..."
        isSearchable
      />
    </Form.Group>
  );
};

export default BottlerDropdown;
