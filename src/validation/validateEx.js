import checkEmptyInput from '../util/checkEmptyInput.js';
import throwError from '../util/throw-error.js';
import runValidators from './run-validator.js';

// 한 번만
const pattern = {
  bracketNameNumber: /^\[([가-힣a-zA-Z]+)-(\d+)\]$/, // [이름-숫자]
  nameNumber: /^([가-힣a-zA-Z]+)-(\d+)$/, // 이름-숫자
  number: /^\d+$/, // 숫자
  name: /^([가-힣a-zA-Z]+)$/, // 이름
};

// 컴마로 여러번 반복
const patterns = {
  bracketNameNumber: /^\[([가-힣a-zA-Z]+)-(\d+)\](,\[([가-힣a-zA-Z]+)-(\d+)\])*$/, // [이름-숫자] 반복
  nameNumber: /^([가-힣a-zA-Z]+)-(\d+)(,([가-힣a-zA-Z]+)-(\d+))*$/, // 이름-숫자 반복
  number: /^\d+(,\d+)*$/, // 숫자 반복
  name: /^([가-힣a-zA-Z]+)(,([가-힣a-zA-Z]+))*$/, // 이름 반복
};

export const ERROR_MESSAGES = {
  INVALID_INPUT: '[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.',
};

// 정규표현식 패턴
const namePattern = /^[가-힣a-zA-Z]{1,5}$/; // 한글/영어로 이루어진 1~10자의 닉네임
const MINIMUM_TEAM_SIZE = 5; // 최소 인원 수
const MAXIMUM_TEAM_SIZE = 30; // 최대 인원 수

const validateFormat = (input) => {
  if (!patterns.bracketNameNumber.test(input)) {
    throwError('[ERROR] 입력값이 [이름-숫자] 형식에 맞지 않습니다. 올바른 형식으로 입력해 주세요.');
  }
  return input;
};

const validateNameFormat = (input) => {
  const names = input.split(',').map((name) => name.trim());
  names.forEach((name) => {
    if (!namePattern.test(name)) {
      throwError(`[ERROR] 닉네임 "${name}"은(는) 유효하지 않습니다. 한글 또는 영어로 이루어진 1~5자의 닉네임을 입력하세요.`);
    }
  });
  return names;
};

const validateTeamSize = (names) => {
  if (names.length < MINIMUM_TEAM_SIZE || names.length > MAXIMUM_TEAM_SIZE) {
    throwError(`[ERROR] 근무자는 최소 ${MINIMUM_TEAM_SIZE}명 이상, 최대 ${MAXIMUM_TEAM_SIZE}명 이하여야 합니다.`);
  }
  return names;
};

const checkForDuplicateNames = (names) => {
  const uniqueNames = new Set(names);
  if (uniqueNames.size !== names.length) {
    throwError('[ERROR] 중복된 닉네임이 포함되어 있습니다.');
  }
  return names;
};

const validateInput = (input) => runValidators([checkEmptyInput, validateFormat, validateNameFormat, validateTeamSize, checkForDuplicateNames], input);

export default validateInput;
