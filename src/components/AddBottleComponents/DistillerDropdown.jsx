import { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const DistillerDropdown = ({
  required = false,
  onChange,
  className,
  tooltip,
}) => {
  const [distillersList, setDistillersList] = useState([]);
  const [selectedDistiller, setSelectedDistiller] = useState({ label: "Select Distiller...", value: "Select Distiller..." });

  useEffect(() => {
    onChange(selectedDistiller.label);
  });

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/distillers`);
        const data = await response.json();
        setDistillersList(data.map((type) => ({ label: type, value: type })));
      } catch (error) {
        console.error("Error fetching distillers", error);
      }
    };

    fetchTypes();
  }, []);

  return (
    <Form.Group as={Col} className={className}>
      {tooltip ? (
        <span>
          <Form.Label>Distiller</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{tooltip}</Tooltip>}
          >
            <i class="bi bi-info-circle-fill mx-2"></i>
          </OverlayTrigger>
        </span>
      ) : (
        <Form.Label>Distiller</Form.Label>
      )}

      <Select
        options={distillersList}
        value={selectedDistiller}
        onChange={(selectedOption) => setSelectedDistiller(selectedOption)}
        placeholder="Select Distiller..."
        isSearchable
      />
    </Form.Group>
  );
};

export default DistillerDropdown;
