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
  printStartMessage() {
    OutputView.printMessage('점심 메뉴 추천을 시작합니다.');
  },
};

export default OutputView;
