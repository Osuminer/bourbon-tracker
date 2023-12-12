import { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const TypeDropdown = ({
  required = false,
  onChange,
  className,
  tooltip,
}) => {
  const [typesList, setTypesList] = useState([]);
  const [selectedType, setSelectedType] = useState({ label: "Select Type...", value: "Select Type..." });

  useEffect(() => {
    onChange(selectedType.label);
  });

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/types`);
        const data = await response.json();
        setTypesList(data.map((type) => ({ label: type, value: type })));
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  return (
    <Form.Group as={Col} className={className}>
      {tooltip ? (
        <span>
          <Form.Label>Bottle Type</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{tooltip}</Tooltip>}
          >
            <i class="bi bi-info-circle-fill mx-2"></i>
          </OverlayTrigger>
        </span>
      ) : (
        <Form.Label>Bottle Type</Form.Label>
      )}

      <Select
        options={typesList}
        value={selectedType}
        onChange={(selectedOption) => setSelectedType(selectedOption)}
        placeholder="Select Type..."
        isSearchable
      />
    </Form.Group>
  );
};

export default TypeDropdown;
