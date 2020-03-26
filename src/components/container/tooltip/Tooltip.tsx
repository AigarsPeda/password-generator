import React from "react";
import "./Tooltip.scss";

interface ITooltip {
  massage: string;
  position: string;
  displayTooltip?: boolean;
}

const Tooltip: React.FC<ITooltip> = props => {
  const { massage, position, displayTooltip } = props;

  return (
    <>
      {displayTooltip ? (
        <div className={`tooltip-bubble tooltip-${position}`}>
          <div className="tooltip-message">{massage}</div>
        </div>
      ) : null}
    </>
  );
};

export default Tooltip;
