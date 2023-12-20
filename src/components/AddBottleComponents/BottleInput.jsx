import React from "react";
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
  return (
    <Form.Group as={Col} className={className}>
      {tooltip ? (
        <span>
          <Form.Label>{label}</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{tooltip}</Tooltip>}
          >
            <i className="bi bi-info-circle-fill mx-2"></i>
          </OverlayTrigger>
        </span>
      ) : (
        <Form.Label>{label}</Form.Label>
      )}

      <Form.Control
        required={required}
        placeholder={placeholder}
        value={value}
        as={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default BottleInput;
