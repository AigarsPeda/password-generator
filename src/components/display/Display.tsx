import React, { useState } from "react";
import "./Display.scss";

import Container from "../container/Container";
import Button from "../container/button/Button";
import { generatePassword } from "../../utils/helper";

const Display: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [range, setRange] = useState<number>();
  const [passwordProps, setPasswordProps] = useState<PasswordProps>();
  let pwdDescription = "";

  const setBackGroundColor = (psw: string) => {
    if (psw && psw.length >= 1 && psw.length <= 5) {
      pwdDescription = "Bad password";
      return "#cb473e";
    } else if (psw && psw.length >= 6 && psw.length <= 10) {
      pwdDescription = "Weak password";
      return "#f07d58";
    } else if (psw && psw.length > 10) {
      pwdDescription = "Strong password";
      return "#55a95d";
    } else {
      return "#cb473e";
    }
  };

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
        <div
          className="col-md-12 password-display-container"
          style={{ backgroundColor: setBackGroundColor(password) }}
        >
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
              {password && password.length > 10 ? (
                <>
                  <i className="fas fa-check-circle" />
                  {pwdDescription}
                </>
              ) : (
                <>
                  <i className="fas fa-exclamation-circle" />
                  {pwdDescription}
                </>
              )}
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
