import React from "react";
import "./Container.scss";
import Button from "./button/Button";
import Slider from "./slider/Slider";

const Container: React.FC = () => {
  const onChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
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
              value={10}
              defaultLength={10}
              onChangeValue={onChangeSlider}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="row checkbox-container">Checkbox component</div>
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
