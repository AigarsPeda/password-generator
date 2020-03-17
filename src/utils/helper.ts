let characters = "";
let passwordLength = 0;

const setUpperCase = (isUpperCase: boolean) => {
  if (isUpperCase) {
    characters += "ABCDEFGHIJKLMONOPQRSTUVWXYZ";
  }
  return "";
};

const setLowerCase = (isLowerCase: boolean) => {
  if (isLowerCase) {
    characters += "abcdefghijklmnopqrstuvwxyz";
  }
  return "";
};

const setSymbols = (isSymbols: boolean) => {
  if (isSymbols) {
    characters += "!@#$%^&*()<>?/[]{}_=-";
  }
  return "";
};

const setNumbers = (isNumeric: boolean) => {
  if (isNumeric) {
    characters += "0123456789";
  }
  return "";
};

export const setPasswordLength = (length: number) => {
  passwordLength = length;
  return length;
};
