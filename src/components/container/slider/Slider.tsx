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

  const activeRangeColor = "#4aa1f3";
  const rangeBackground = "#d7dcdf";

  const handleChange = (max: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangeValue(e);
  };

  const progressValue = defaultLength;
  const progress = (progressValue / max) * 100 + "%";
  const styleInput = {
    background: `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`
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
          onChange={handleChange(max)}
          style={styleInput}
        />
        <span className="range-slider-value">10</span>
      </div>
    </div>
  );
};

export default Slider;
