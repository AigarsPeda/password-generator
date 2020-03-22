import React, { useState } from "react";
import "./Display.scss";

import Container from "../container/Container";
import Button from "../container/button/Button";
import { generatePassword } from "../../utils/helper";

const Display: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [range, setRange] = useState<number>();
  const [passwordProps, setPasswordProps] = useState<PasswordProps>();

  const generateNewPassword = () => {
    if (!passwordProps || !range) {
      return;
    }
    const pwd = generatePassword(passwordProps, range);
    if (pwd) {
      setPassword(pwd);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12 password-display-container">
          <div style={{ width: "100%" }}>
            <div className="password-display">
              <input
                type="text"
                className="password-display-input"
                value={password}
                readOnly
              />
            </div>
            <div className="password-description">
              <i className="fas fa-check-circle" /> Strong password
            </div>
          </div>
          <div className="password-display-icons">
            <Button className="copy-btn" iconClass="far fa-copy" />
            <Button
              className="generate-btn"
              iconClass="fas fa-sync-alt"
              handleClick={() => generateNewPassword()}
            />
          </div>
        </div>
      </div>
      <Container
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
      />
    </>
  );
};

export default Display;
