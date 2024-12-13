import { MENU } from '../constant/index.js';
import checkEmptyInput from '../util/checkEmptyInput.js';
import throwError from '../util/throw-error.js';
import runValidators from './run-validator.js';

// 컴마로 여러번 반복
const patterns = {
  name: /^([가-힣a-zA-Z]+)(,([가-힣a-zA-Z]+))*$/,
};

export const ERROR_MESSAGES = {
  INVALID_INPUT: '[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.',
};

const validateFormat = (input) => {
  if (!patterns.name.test(input)) {
    throwError('[ERROR] 입력값이 형식에 맞지 않습니다. 올바른 형식으로 입력해 주세요.');
  }
  return input;
};

const validateNameFormat = (input) => {
  const names = input.split(',').map((name) => name.trim());

  const allMenu = Object.values(MENU).flat();

  names.forEach((name) => {
    if (!allMenu.includes(name)) {
      throwError(`[ERROR] 없는 메뉴입니다. 다시 입력해주세요`);
    }
  });
  return names;
};

const validateNotEatFood = (input) => {
  if (!input || input.trim() === '') return input;
  return runValidators([validateFormat, validateNameFormat], input);
};

export default validateNotEatFood;
