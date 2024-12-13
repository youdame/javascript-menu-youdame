// @ts-check
import { Random } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import shuffle from './util/shuffle.js';

/*
점심 메뉴 추천을 시작합니다.

코치의 이름을 입력해 주세요. (, 로 구분)
토미,제임스,포코

토미(이)가 못 먹는 메뉴를 입력해 주세요.
우동,스시

제임스(이)가 못 먹는 메뉴를 입력해 주세요.
뇨끼,월남쌈

포코(이)가 못 먹는 메뉴를 입력해 주세요.
마파두부,고추잡채

메뉴 추천 결과입니다.
[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]
[ 카테고리 | 한식 | 한식 | 일식 | 중식 | 아시안 ]
[ 토미 | 쌈밥 | 김치찌개 | 미소시루 | 짜장면 | 팟타이 ]
[ 제임스 | 된장찌개 | 비빔밥 | 가츠동 | 토마토 달걀볶음 | 파인애플 볶음밥 ]
[ 포코 | 된장찌개 | 불고기 | 하이라이스 | 탕수육 | 나시고렝 ]

추천을 완료했습니다.
*/

/*
  describe('전체 기능 테스트', () => {
    test('카테고리 메뉴 중복 없는 추천', () => {
      const logSpy = getLogSpy();

      mockRandoms([2, 5, 1, 3, 4]);
      mockQuestions(['구구,제임스', '김밥', '떡볶이']);

      const sequenced = (_, idx) => idx + 1;
      mockShuffles([
        // 구구
        [2, Array.from({ length: 9 }, sequenced)],
        [7, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
        [2, Array.from({ length: 9 }, sequenced)],

        // 제임스
        [9, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
      ]);

      const app = new App();
      app.run();

      const log = getOutput(logSpy);

      expect(log.replace(/\n/g, '')).toEqual(
        expect.stringContaining(
          [
            '점심 메뉴 추천을 시작합니다.',
            '메뉴 추천 결과입니다.',
            '[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]',
            '[ 카테고리 | 한식 | 양식 | 일식 | 중식 | 아시안 ]',
            '[ 구구 | 김치찌개 | 스파게티 | 규동 | 짜장면 | 카오 팟 ]',
            '[ 제임스 | 제육볶음 | 라자냐 | 가츠동 | 짬뽕 | 파인애플 볶음밥 ]',
            '추천을 완료했습니다.',
          ].join(''),
        ),
      );
    });
  });
});
*/

const Menu = {
  일식: ['규동', '우동', '미소시루', '스시', '가츠동', '오니기리', '하이라이스', '라멘', '오코노미야끼'],
  한식: ['김밥', '김치찌개', '쌈밥', '된장찌개', '비빔밥', '칼국수', '불고기', '떡볶이', '제육볶음'],
  중식: ['깐풍기', '볶음면', '동파육', '짜장면', '짬뽕', '마파두부', '탕수육', '토마토 달걀볶음', '고추잡채'],
  아시안: ['팟타이', '카오 팟', '나시고렝', '파인애플 볶음밥', '쌀국수', '똠얌꿍', '반미', '월남쌈', '분짜'],
  양식: ['라자냐', '그라탱', '뇨끼', '끼슈', '프렌치 토스트', '바게트', '스파게티', '피자', '파니니'],
};

//  1이면 일식, 2면 한식, 3이면 중식, 4면 아시안, 5면 양식
const categories = { 1: '일식', 2: '한식', 3: '중식', 4: '아시안', 5: '양식' };

class App {
  /** @type {string[]}} */
  category = [];

  /** @type {Record<string,string[]>}} */
  coachesInfo = {};

  /*
  먼저 이름 받고 
  못 먹는 메뉴를 받는다.. 
  */
  getCategoryFromCantEat() {}

  async run() {
    OutputView.printMessage('점심 메뉴 추천을 시작합니다.');

    const nameInput = await InputView.readUserInput('코치의 이름을 입력해 주세요. (, 로 구분)\n');

    const coachesName = nameInput.split(',');

    for (const name of coachesName) {
      this.coachesInfo[name] = [];
    }

    for (const name of coachesName) {
      const notFood = await InputView.readUserInput(`${name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`);
      this.coachesInfo[name].push(notFood);
    }

    OutputView.printMessage('\n');
    OutputView.printMessage('메뉴 추천 결과입니다.\n');
    OutputView.printMessage('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');

    // 카테고리 선정
    for (let i = 1; i <= 5; i++) {
      let randomNumber = Random.pickNumberInRange(1, 5);

      const filteredCategory = this.category.filter((category) => category === categories[randomNumber]);

      if (filteredCategory.length >= 2) {
        randomNumber = Random.pickNumberInRange(1, 5);
      }

      this.category.push(categories[randomNumber]);
    }

    OutputView.printMessage(`[ 카테고리 | ${this.category[0]} | ${this.category[1]} | ${this.category[2]} | ${this.category[3]} | ${this.category[4]} ]`);

    // 메뉴 선정
    for (const coach of Object.keys(this.coachesInfo)) {
      OutputView.printMessage(
        `[ ${coach} | ${this.getMenu(coach, 0)} | ${this.getMenu(coach, 1)} | ${this.getMenu(coach, 2)} | ${this.getMenu(coach, 3)} | ${this.getMenu(coach, 4)} ]`,
      );
    }

    OutputView.printMessage('추천을 완료했습니다.\n');
  }

  getMenu(coach, index) {
    const notFood = this.coachesInfo[coach];

    while (true) {
      const currentCategory = this.category[index];
      const foodList = Menu[currentCategory];

      const menu = shuffle(foodList)[0];

      if (!notFood.includes(menu)) {
        return menu;
      }
    }

    /* 못 먹는 음식이면 다시 섞어야함 
    자기가 못 먹는 음식을 추천하진 않을테니,
    그걸 알려면 지금 코치가 누구인지, 못 먹는 음식이랑 지금 뽑힌 음식이 같은지 알아야함
    근데 솔직히 무슨 카테고린지 알아야하나? 
    성능 따지려면 카테고리부터 따지는 게 맞긴함

    일단은 메뉴 이름이 같은지만 보면 될듯
    */
  }
}

export default App;
