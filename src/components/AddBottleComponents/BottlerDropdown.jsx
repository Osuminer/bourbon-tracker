import { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const BottlerDropdown = ({
  required = false,
  onChange,
  className,
  tooltip,
}) => {
  const [bottlersList, setBottlersList] = useState([]);
  const [selectedBottler, setSelectedBottler] = useState({ label: "Select Bottler...", value: "Select Bottler..." });

  useEffect(() => {
    onChange(selectedBottler.label);
  });

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/bottlers`);
        const data = await response.json();
        setBottlersList(data.map((type) => ({ label: type, value: type })));
      } catch (error) {
        console.error("Error fetching bottlers:", error);
      }
    };

    fetchTypes();
  }, []);

  return (
    <Form.Group as={Col} className={className}>
      {tooltip ? (
        <span>
          <Form.Label>Bottler</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{tooltip}</Tooltip>}
          >
            <i class="bi bi-info-circle-fill mx-2"></i>
          </OverlayTrigger>
        </span>
      ) : (
        <Form.Label>Bottler</Form.Label>
      )}

      <Select
        options={bottlersList}
        value={selectedBottler}
        onChange={(selectedOption) => setSelectedBottler(selectedOption)}
        placeholder="Select Bottler..."
        isSearchable
      />
    </Form.Group>
  );
};

export default BottlerDropdown;
