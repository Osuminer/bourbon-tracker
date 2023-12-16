import React, { useEffect, useState } from "react";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const BottleInput = ({
  label,
  placeholder,
  required = false,
  onChange,
  className,
  tooltip,
  type = "input",
  value,
}) => {
  const [textValue, setTextValue] = useState(value);

  useEffect(() => {
    // Set the initial state value
    setTextValue(value);
  }, [value]);

  return (
    <Form.Group as={Col} className={className}>
      {tooltip ? (
        <span>
          <Form.Label>{label}</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{tooltip}</Tooltip>}
          >
            <i class="bi bi-info-circle-fill mx-2"></i>
          </OverlayTrigger>
        </span>
      ) : (
        <Form.Label>{label}</Form.Label>
      )}

      <Form.Control
        required={required}
        placeholder={placeholder}
        defaultValue={textValue}
        as={type}
        onChange={(e) => setTextValue(e.target.value)}
        onBlur={() => onChange(textValue)}
      />
    </Form.Group>
  );
};

export default BottleInput;
