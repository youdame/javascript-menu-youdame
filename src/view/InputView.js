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
};
export default InputView;
