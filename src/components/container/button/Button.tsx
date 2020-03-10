import React from "react";

interface IButton {
  label?: string;
  className?: string;
  iconClass?: string;
  handleClick?: () => void;
}

const Button: React.FC<IButton> = props => {
  const { label, className, iconClass, handleClick } = props;
  return (
    <>
      <button className={className} onClick={handleClick} ria-label={label}>
        <i className={iconClass} /> {label}
      </button>
    </>
  );
};

export default Button;
