// @ts-check

import { Console } from '@woowacourse/mission-utils';
import OutputView from './OutputView.js';
import validateNameInput from '../validation/validateNameInput.js';

const YES = 'Y';
const NO = 'N';

const InputView = {
  /** @param {string} message  */
  async readUserInput(message) {
    return Console.readLineAsync(message);
  },

  async getCoachesName() {
    while (true) {
      try {
        const nameInput = await InputView.readUserInput('코치의 이름을 입력해 주세요. (, 로 구분)\n');
        const names = validateNameInput(nameInput);
        return names;
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  },
};
export default InputView;
