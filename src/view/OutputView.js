// @ts-check

import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  /** @param {string} message  */
  printMessage(message) {
    Console.print(message);
  },

  /** @param {Error} error */
  printErrorMessage(error) {
    OutputView.printMessage(error.message);
  },
};

export default OutputView;
