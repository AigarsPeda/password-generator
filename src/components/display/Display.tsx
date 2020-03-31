import React, { useState, useRef } from "react";
import "./Display.scss";

import Container from "../container/Container";
import Button from "../container/button/Button";
import Tooltip from "../container/tooltip/Tooltip";
import { generatePassword, copyToClipBoard } from "../../utils/helper";

const Display: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [range, setRange] = useState<number>();
  const [passwordProps, setPasswordProps] = useState<PasswordProps>();
  const [tooltip, setTooltip] = useState(false);
  const [type, setType] = useState("password");
  const passwordRef = useRef<HTMLInputElement>(null);
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

  const copyClipBoard = () => {
    if (passwordRef.current === null) {
      return;
    }
    copyToClipBoard(passwordRef.current);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 2000);
  };

  const onSelectTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const selectTagStyles = {
    color: "#506175",
    width: "20%",
    backgroundColor: "inherit",
    height: "auto",
    marginLeft: "-14px"
  };

  return (
    <>
      <div>
        {/* <select
          name="type"
          value={type}
          onChange={onSelectTag}
          className="form-control form-control-sm"
          style={selectTagStyles}
        >
          <option value="password">Random Password</option>
          <option value="pin">PIN</option>
        </select> */}
      </div>
      <div className="row">
        <div
          className="col-md-12 password-display-container"
          style={{ backgroundColor: setBackGroundColor(password) }}
        >
          <div style={{ width: "100%" }}>
            <div className="password-display">
              <input
                ref={passwordRef}
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
            <Button
              className="copy-btn"
              iconClass="far fa-copy"
              handleClick={() => copyClipBoard()}
            />
            <Button
              className="generate-btn"
              iconClass="fas fa-sync-alt"
              handleClick={() => generateNewPassword()}
            />
            <Tooltip
              massage="Copied"
              position="left"
              displayTooltip={tooltip}
            />
          </div>
        </div>
      </div>
      <Container
        type={type}
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
        passwordRef={passwordRef}
      />
    </>
  );
};

export default Display;
