import React, { useState } from "react";
import "./Container.scss";
import Button from "./button/Button";
import Slider from "./slider/Slider";
import CheckBox from "./checkbox/CheckBox";

const CHECKBOX_LIST: CheckBox[] = [
  {
    id: 0,
    name: "uppercase",
    label: "Uppercase",
    isChecked: true,
    disabled: false
  },
  {
    id: 1,
    name: "lowercase",
    label: "Lowercase",
    isChecked: true,
    disabled: false
  },
  {
    id: 2,
    name: "symbols",
    label: "Symbols",
    isChecked: true,
    disabled: false
  },
  { id: 3, name: "numbers", label: "Numbers", isChecked: true, disabled: false }
];

const Container: React.FC = () => {
  const [rangeValue, setRangeValue] = useState(12);
  const [checkboxes, setCheckBoxes] = useState<CheckBox[]>(CHECKBOX_LIST);

  const onChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(parseInt(e.target.value, 10));
  };

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const newCheckboxes = checkboxes.map(checkbox => {
      if (checkbox.name === name) {
        return {
          ...checkbox,
          isChecked: !checkbox.isChecked
        };
      }
      return checkbox;
    });
    setCheckBoxes(newCheckboxes);
  };
  return (
    <div className="password-settings">
      <h3>Use the slider, and select from the options</h3>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            &nbsp;
            <Slider
              min={1}
              max={60}
              step={1}
              value={rangeValue}
              defaultLength={rangeValue}
              onChangeValue={onChangeSlider}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="row checkbox-container">
            {checkboxes.map(checkbox => {
              return (
                <CheckBox
                  key={checkbox.id}
                  name={checkbox.name}
                  checked={checkbox.isChecked}
                  label={checkbox.label}
                  onChange={onChangeCheckBox}
                />
              );
            })}
          </div>
        </div>
      </div>
      <br />
      <div className="text-center">
        <div className="row">
          <div className="col-md-12">
            <Button className="btn password-btn" label="Copy password" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
