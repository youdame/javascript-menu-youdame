import { INPUT_PATTERN, MENU } from '../constant/index.js';
import throwError from '../util/throw-error.js';
import runValidators from './run-validator.js';

const MINIMUM_NOT_EAT_FOOD_NUMBER = 2;

export const ERROR_MESSAGES = {
  INVALID_INPUT: '[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.',
};

const validateFormat = (input) => {
  if (!INPUT_PATTERN.name.test(input)) {
    throwError('[ERROR] 입력값이 형식에 맞지 않습니다. 올바른 형식으로 입력해 주세요.');
  }
  return input;
};

const validateNameFormat = (input) => {
  const names = input.split(',').map((name) => name.trim());

  const allMenu = Object.values(MENU).flat();

  names.forEach((name) => {
    if (!allMenu.includes(name)) {
      throwError(`[ERROR] 없는 메뉴를 포함해서 입력하셨습니다. 다시 입력해주세요`);
    }
  });
  return names;
};

const validateCoachNumber = (names) => {
  if (names.length > MINIMUM_NOT_EAT_FOOD_NUMBER) {
    throwError(`[ERROR] 못 먹는 메뉴는 최대 ${MINIMUM_NOT_EAT_FOOD_NUMBER}개만 입력할 수 있습니다.`);
  }
  return names;
};

const validateNotEatFood = (input) => {
  if (!input || input.trim() === '') return input;
  return runValidators([validateFormat, validateCoachNumber, validateNameFormat], input);
};

export default validateNotEatFood;
