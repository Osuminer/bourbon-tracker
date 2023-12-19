import React, { useEffect, useState } from "react";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const TagInput = ({
  label,
  placeholder,
  required = false,
  onChange,
  tooltip,
  value,
}) => {
  const [textValue, setTextValue] = useState(value);

  useEffect(() => {
    // Set the initial state value
    setTextValue(value);
  }, [value]);

  return (
    <Form.Group as={Col} className='col-sm-12'>
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
        onChange={(e) => setTextValue(e.target.value)}
        onBlur={() => onChange(textValue)}
      />
    </Form.Group>
  );
};

export default TagInput;
