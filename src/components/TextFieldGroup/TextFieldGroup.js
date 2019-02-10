import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

// needs to use semantic ui classes for forms and red text
import "./TextFieldGroup.css";

const TextFieldGroup = ({
  name,
  value,
  placeholder,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="field">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "input-error": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="ui error message">{info}</small>}
      {error && <div className="dataError">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text",
  info: "",
  disabled: false,
  placeholder: "",
  error: ""
};

export default TextFieldGroup;
