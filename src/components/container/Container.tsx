import React, { useState, useEffect } from "react";
import "./Container.scss";
import Button from "./button/Button";
import Slider from "./slider/Slider";
import CheckBox from "./checkbox/CheckBox";
import {
  generatePassword,
  setPasswordLength,
  copyToClipBoard
} from "../../utils/helper";
import Tooltip from "./tooltip/Tooltip";

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
  passwordRef: React.RefObject<HTMLInputElement>;
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
  const [checked, setChecked] = useState(false);
  const [checkedName, setCheckedName] = useState("");
  const [tooltip, setTooltip] = useState(false);
  const { setPassword, setRange, setPasswordProps, passwordRef } = props;

  const checkBoxCount = () => {
    // const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
    // obj[key];

    // Array<keyof PasswordProps>
    // (key: keyof PasswordProps)

    const checkedCount = Object.keys(checkBoxesState).filter(
      // WHAT TYPE IS [KEY] !!??
      // @ts-ignore
      (key: string) => checkBoxesState[key]
    );
    const disabled = checkedCount.length === 1;
    const name = checkedCount[0];
    if (disabled) {
      setChecked(disabled);
      setCheckedName(name);
    } else {
      setChecked(false);
      setCheckedName("");
    }
  };

  const copyClipBoard = () => {
    if (passwordRef.current === null) {
      return;
    }
    copyToClipBoard(passwordRef.current);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 2000);
  };

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
    checkBoxCount();
  }, [
    // passwordGenerated,
    // checkBoxCount,
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
                  disabled={
                    checked &&
                    checkbox.isChecked &&
                    checkedName === checkbox.name
                  }
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
            <Button
              className="btn password-btn"
              label="Copy password"
              handleClick={() => copyClipBoard()}
            />
            <Tooltip
              massage="Copied"
              position="bottom"
              displayTooltip={tooltip}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
