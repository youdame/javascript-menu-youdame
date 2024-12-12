import throwError from './throw-error.js';

const checkEmptyInput = (input) => {
  if (!input || input.trim() === '') {
    throwError('[ERROR] 입력값이 비어있습니다. 값을 입력해 주세요.');
  }
  return input;
};

export default checkEmptyInput;
