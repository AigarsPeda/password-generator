import React from "react";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <div className="row">
      <div className="col-md-12 header">
        <h1 className="h1">Password Generator</h1>
        <div className="col-md-12">
          <h4>Create strong password</h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
