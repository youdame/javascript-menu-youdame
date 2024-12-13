// @ts-check

import { Random } from '@woowacourse/mission-utils';
import OutputView from '../view/OutputView.js';
import { CATEGORIES, MENU } from '../constant/index.js';
import pickNumberInRange from '../util/pickNumberInRange.js';

const CATEGORY_NUMBER = 5;
class LunchMenuRecommendation {
  /**
   * @constructor
   * @param {string[]} category
   * @param {Record<string,string[]>} coachesNotEatFoodInfo
   * @param {Record<string,string[]>} coachesMenu
   */
  constructor(category, coachesNotEatFoodInfo, coachesMenu) {
    this.category = category;
    this.coachesNotEatFoodInfo = coachesNotEatFoodInfo;
    this.coachesMenu = coachesMenu;
  }

  play() {
    OutputView.printMessage('\n');
    OutputView.printMessage('메뉴 추천 결과입니다.\n');
    OutputView.printMessage('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');

    this.selectCategories();
    this.printSelectedCategory();
    this.recommendMenus();
    this.printRecommendedMenu();

    OutputView.printMessage('추천을 완료했습니다.\n');
  }

  selectCategories() {
    for (let i = 1; i <= CATEGORY_NUMBER; i++) {
      this.selectCategory();
    }
  }

  selectCategory() {
    const randomNumber = pickNumberInRange(1, CATEGORY_NUMBER);

    const selectedCategory = CATEGORIES[randomNumber];
    const filteredCategory = this.category.filter((category) => category === selectedCategory);

    if (filteredCategory.length < 2) {
      return this.category.push(selectedCategory);
    }
    return this.selectCategory();
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

export default LunchMenuRecommendation;
