import React, { useState, useRef } from "react";
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
  const [range, setRange] = useState<number>();
  const rangeRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const activeRangeColor = "#4aa1f3";
  const rangeBackground = "#d7dcdf";

  const handleChange = (max: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangeValue(e);
    const value = parseInt(e.target.value, 10);
    setRange(value);
    const progress = (value / max) * 100 + "%";
    const newBackgroundStyle = `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`;
    rangeRef.current.style.background = newBackgroundStyle;
  };

  if (range !== defaultLength || !range) {
    setRange(defaultLength);
  }

  const progressValue = defaultLength;
  const progress = (progressValue / max) * 100 + "%";
  const styleInput = {
    background: `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`
  };

  return (
    <div className="slider-container">
      <div className="slider x">
        <input
          ref={rangeRef}
          className="range-slider"
          type="range"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={handleChange(max)}
          style={styleInput}
        />
        <span className="range-slider-value">{progressValue}</span>
      </div>
    </div>
  );
};

export default Slider;
