import React, { useEffect, useState } from "react";
import { Form, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

const TagInput = ({
  label,
  placeholder,
  required = false,
  onChange,
  tooltip,
  value,
}) => {
  const [tagsList, setTagsList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState(value ? [value] : []);

  useEffect(() => {
    // Set the initial state value
    if (value) {
      setSelectedTags([value]);
    }
  }, [value]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/tags`);
        const data = await response.json();
        const initialList = data.map((type) => ({ label: type, value: type }));
        setTagsList(initialList);
      } catch (error) {
        console.error("Error fetching tags", error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
    const selectedLabels = selectedOptions.map((option) => option.label);
    onChange(selectedLabels);
  };

  const handleCreate = (input) => {
    const newOption = { label: input, value: input };
    setSelectedTags([...selectedTags, newOption]);
    setTagsList([...tagsList, newOption]);
    onChange([...selectedTags.map((tag) => tag.label), input]);
  };

  return (
    <Form.Group as={Col} className="col-sm-12">
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

      <CreatableSelect
        isClearable
        isSearchable
        isMulti
        options={tagsList}
        required={required}
        placeholder={placeholder}
        inputValue={inputValue}
        onChange={handleChange}
        onCreateOption={handleCreate}
        onInputChange={(input) => setInputValue(input)}
        value={selectedTags}
      />
    </Form.Group>
  );
};

export default TagInput;
