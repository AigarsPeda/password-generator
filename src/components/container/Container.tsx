import React from "react";
import "./Container.scss";
import Button from "./button/Button";

const Container: React.FC = () => {
  return (
    <div className="row password-settings">
      <h3>Use the slider, and select from the options</h3>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">Slider component</div>
        </div>
        <div className="col-md-12">
          <div className="row checkbox-container">Checkbox component</div>
        </div>
      </div>
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
