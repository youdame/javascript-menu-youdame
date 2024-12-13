// @ts-check
import { Random } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import { CATEGORIES, MENU } from './constant/index.js';

class App {
  /** @type {string[]}} */
  category = [];

  /** @type {Record<string,string[]>}} */
  coachesNotEatFoodInfo = {};

  /** @type {Record<string,string[]>}} */
  coachesMenu = {};

  async getNotEatFood() {
    /// 못먹는 메뉴가 메뉴 리스트에 없는 거라면 있는 것만 해달라고 해야하지 않을까?
    for (const name of Object.keys(this.coachesNotEatFoodInfo)) {
      const notEatFood = await InputView.readUserInput(`${name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`);
      this.coachesNotEatFoodInfo[name].push(notEatFood);
    }
  }

  putCoachesName(coachesName) {
    for (const name of coachesName) {
      this.coachesNotEatFoodInfo[name] = [];
      this.coachesMenu[name] = [];
    }
  }

  async run() {
    // 첫 출력
    this.printStartMessage();

    const coachesName = await InputView.getCoachesName();
    this.putCoachesName(coachesName);

    await this.getNotEatFood();

    this.printResultMessage();
  }

  printResultMessage() {
    OutputView.printMessage('\n');
    OutputView.printMessage('메뉴 추천 결과입니다.\n');
    OutputView.printMessage('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');

    this.selectCategory();
    this.printSelectedCategory();
    this.recommendMenus();
    this.printRecommendedMenu();

    OutputView.printMessage('추천을 완료했습니다.\n');
  }

  printStartMessage() {
    OutputView.printMessage('점심 메뉴 추천을 시작합니다.');
  }

  selectCategory() {
    for (let i = 1; i <= 5; i++) {
      let randomNumber = Random.pickNumberInRange(1, 5);

      const filteredCategory = this.category.filter((category) => category === CATEGORIES[randomNumber]);

      if (filteredCategory.length >= 2) {
        randomNumber = Random.pickNumberInRange(1, 5);
      }

      this.category.push(CATEGORIES[randomNumber]);
    }
  }

  recommendMenus() {
    for (const coach of Object.keys(this.coachesNotEatFoodInfo)) {
      for (let i = 0; i <= 4; i++) {
        const recommendedMenu = this.recommendMenu(coach, i);
        this.coachesMenu[coach].push(recommendedMenu);
      }
    }
  }

  printSelectedCategory() {
    OutputView.printMessage(`[ 카테고리 | ${this.category[0]} | ${this.category[1]} | ${this.category[2]} | ${this.category[3]} | ${this.category[4]} ]`);
  }

  printRecommendedMenu() {
    for (const coach of Object.keys(this.coachesNotEatFoodInfo)) {
      OutputView.printMessage(
        `[ ${coach} | ${this.coachesMenu[coach][0]} | ${this.coachesMenu[coach][1]} | ${this.coachesMenu[coach][2]} | ${this.coachesMenu[coach][3]} | ${this.coachesMenu[coach][4]} ]`,
      );
    }
  }

  recommendMenu(coach, index) {
    const notFood = this.coachesNotEatFoodInfo[coach];

    while (true) {
      const currentCategory = this.category[index];
      const foodList = MENU[currentCategory];

      const numberArray = Array.from({ length: 9 }, (v, i) => i + 1);

      const menu = foodList[Random.shuffle(numberArray)[0] - 1];

      // 못 먹는 음식이거나 중복된 음식이 아니라면
      if (!notFood.includes(menu) && !this.coachesMenu[coach].includes(menu)) {
        return menu;
      }
    }
  }
}

export default App;
