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

// 정규표현식 패턴
const namePattern = /^[가-힣a-zA-Z]{2,4}$/;
const MINIMUM_COACH_NUMBER = 2;
const MAXIMUM_COACH_NUMBER = 5;

const validateFormat = (input) => {
  if (!patterns.name.test(input)) {
    throwError('[ERROR] 입력값이 형식에 맞지 않습니다. 올바른 형식으로 입력해 주세요.');
  }
  return input;
};

const validateNameFormat = (input) => {
  const names = input.split(',').map((name) => name.trim());
  names.forEach((name) => {
    if (!namePattern.test(name)) {
      throwError(`[ERROR] 이름 "${name}"은(는) 유효하지 않습니다. 한글 또는 영어로 이루어진 2~4자의 이름을 입력하세요.`);
    }
  });
  return names;
};

const validateCoachNumber = (names) => {
  if (names.length < MINIMUM_COACH_NUMBER || names.length > MAXIMUM_COACH_NUMBER) {
    throwError(`[ERROR] 코치는 최소 ${MINIMUM_COACH_NUMBER}명 이상, 최대 ${MAXIMUM_COACH_NUMBER}명 이하여야 합니다.`);
  }
  return names;
};

const validateNameInput = (input) => runValidators([checkEmptyInput, validateFormat, validateNameFormat, validateCoachNumber], input);

export default validateNameInput;
