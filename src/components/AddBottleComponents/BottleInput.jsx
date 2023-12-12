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
}) => {
  const [textValue, setTextValue] = useState();

  useEffect(() => {
    onChange(textValue);
  });

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
        as={type}
        onChange={(e) => setTextValue(e.target.value)}
      ></Form.Control>
    </Form.Group>
  );
};

export default BottleInput;
