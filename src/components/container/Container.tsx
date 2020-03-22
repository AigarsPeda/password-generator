import React, { useState, useEffect } from "react";
import "./Container.scss";
import Button from "./button/Button";
import Slider from "./slider/Slider";
import CheckBox from "./checkbox/CheckBox";
import { generatePassword, setPasswordLength } from "../../utils/helper";

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

interface IContainer {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setRange: React.Dispatch<React.SetStateAction<number | undefined>>;
  setPasswordProps: React.Dispatch<
    React.SetStateAction<PasswordProps | undefined>
  >;
}

const Container: React.FC<IContainer> = props => {
  const [rangeValue, setRangeValue] = useState(12);
  const [checkboxes, setCheckBoxes] = useState<CheckBox[]>(CHECKBOX_LIST);
  const [checkBoxesState, setCheckBoxesState] = useState<PasswordProps>({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true
  });
  const { setPassword, setRange, setPasswordProps } = props;

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const newCheckboxes = checkboxes.map(checkbox => {
      if (checkbox.name === name) {
        setCheckBoxesState({ ...checkBoxesState, [name]: e.target.checked });
        return {
          ...checkbox,
          isChecked: !checkbox.isChecked
        };
      }
      return checkbox;
    });
    setCheckBoxes(newCheckboxes);
  };

  const passwordGenerated = (check: PasswordProps, num: number) => {
    const psw = generatePassword(check, num);
    if (psw) {
      setPassword(psw);
    }
  };

  const onChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(parseInt(e.target.value, 10));
    setPasswordLength(parseInt(e.target.value, 10));
    setRange(parseInt(e.target.value, 10));
    passwordGenerated(checkBoxesState, parseInt(e.target.value, 10));
  };

  useEffect(() => {
    setPasswordLength(rangeValue);
    setRange(rangeValue);
    setRangeValue(rangeValue);
    setPasswordProps(checkBoxesState);
    passwordGenerated(checkBoxesState, rangeValue);
  }, [
    // passwordGenerated,
    setPasswordLength,
    checkBoxesState.lowercase,
    checkBoxesState.numbers,
    checkBoxesState.symbols,
    checkBoxesState.uppercase
  ]);

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
