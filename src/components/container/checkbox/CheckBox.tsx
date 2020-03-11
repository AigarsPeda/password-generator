import React from "react";
import "./CheckBox.scss";

interface ICheckBox {
  label: string;
  value?: string;
  checked: boolean;
  name: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<ICheckBox> = props => {
  const { label, value, checked, name, disabled, onChange } = props;
  return (
    <>
      <div className="col-md-3">
        <label className="container">
          <h1>{label}</h1>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="checkbox-input"
          />
          <span
            className="check-mark"
            style={{ opacity: disabled ? "0.7" : "1" }}
          ></span>
        </label>
      </div>
    </>
  );
};

export default CheckBox;
