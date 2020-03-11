import React from "react";
import "./Slider.scss";

interface ISlider {
  step: number;
  min: number;
  max: number;
  value: number;
  defaultLength?: number;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<ISlider> = props => {
  const { step, min, max, value, onChangeValue, defaultLength = 10 } = props;

  const handleChange = (max: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangeValue(e);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <input
          className="range-slider"
          type="range"
          step={step}
          min={min}
          max={max}
          value={value}
          defaultValue={defaultLength}
          onChange={handleChange(max)}
        />
        <span className="range-slider-value">10</span>
      </div>
    </div>
  );
};

export default Slider;
