// @ts-check

import { Console } from '@woowacourse/mission-utils';
import checkEmptyInput from '../util/checkEmptyInput.js';
import throwError from '../util/throw-error.js';
import OutputView from './OutputView.js';

const YES = 'Y';
const NO = 'N';

const InputView = {
  /** @param {string} message  */
  async readUserInput(message) {
    return Console.readLineAsync(message);
  },

  /**
   * 사용자의 입력을 Y 또는 N으로 받아 true 또는 false를 반환하는 메서드
   * @param {string} message - 사용자에게 표시할 메시지
   * @returns {Promise<boolean>} - 'Y'는 true, 'N'은 false 반환
   */
  async askYesOrNo(message) {
    while (true) {
      try {
        const input = (await InputView.readUserInput(message)).trim();
        checkEmptyInput(input);

        if (input === YES) {
          return true;
        }

        if (input === NO) {
          return false;
        }

        throw throwError('[ERROR] 유효하지 않은 입력입니다. Y 또는 N만 입력해 주세요.');
      } catch (error) {
        OutputView.printMessage(error.message);
      }
    }
  },
};
export default InputView;
