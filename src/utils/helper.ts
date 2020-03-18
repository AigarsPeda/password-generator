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

const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const passwordCharacters = () => {
  const characterList = characters;
  let password = "";
  if (characterList.length > 0) {
    for (let i = 0; i < passwordLength; i++) {
      password += characterList[getRandomInteger(0, characterList.length - 1)];
    }
    characters = "";
    passwordLength = 0;
    return password;
  }
  return;
};

export const setPasswordLength = (length: number) => {
  passwordLength = length;
  // ?
  return length;
};

export const generatePasswordLength = () => {
  return passwordLength;
};

export const generatePassword = (
  passwordProps: PasswordProps,
  pwdLength: number
) => {
  const { uppercase, lowercase, symbols, numbers } = passwordProps;
  setPasswordLength(pwdLength);
  setUpperCase(uppercase);
  setLowerCase(lowercase);
  setSymbols(symbols);
  setNumbers(numbers);

  const password = passwordCharacters();
  return password;
};
