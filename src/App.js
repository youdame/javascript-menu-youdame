// @ts-check
import LunchMenuRecommendation from './controller/LunchMenuRecommendation.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

class App {
  /** @type {string[]}} */
  category = [];

  /** @type {Record<string,string[]>}} */
  coachesNotEatFoodInfo = {};

  /** @type {Record<string,string[]>}} */
  coachesMenu = {};

  async run() {
    OutputView.printStartMessage();

    const coachesName = await InputView.getCoachesName();
    this.putCoachesName(coachesName);

    await this.getNotEatFoods();

    const lunchMenuRecommendation = new LunchMenuRecommendation(this.category, this.coachesNotEatFoodInfo, this.coachesMenu);
    lunchMenuRecommendation.play();
  }

  putCoachesName(coachesName) {
    for (const name of coachesName) {
      this.coachesNotEatFoodInfo[name] = [];
      this.coachesMenu[name] = [];
    }
  }

  async getNotEatFoods() {
    for (const name of Object.keys(this.coachesNotEatFoodInfo)) {
      const notEatFood = await InputView.getNotEatFood(name);
      this.coachesNotEatFoodInfo[name] = notEatFood;
    }
  }
}

export default App;
