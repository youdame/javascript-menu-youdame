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
  category = [];

  coaches = [];

  async run() {
    OutputView.printMessage('점심 메뉴 추천을 시작합니다.');

    const nameInput = await InputView.readUserInput('코치의 이름을 입력해 주세요. (, 로 구분)\n');

    this.coaches = nameInput.split(',');

    for (const name of this.coaches) {
      await InputView.readUserInput(`${name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`);
    }
    OutputView.printMessage('\n');
    OutputView.printMessage('메뉴 추천 결과입니다.\n');
    OutputView.printMessage('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');

    for (let i = 1; i <= 5; i++) {
      let randomNumber = Random.pickNumberInRange(1, 5);

      const filteredCategory = this.category.filter((category) => category === categories[randomNumber]);

      if (filteredCategory.length >= 2) {
        randomNumber = Random.pickNumberInRange(1, 5);
      }

      this.category.push(categories[randomNumber]);
    }

    OutputView.printMessage(`[ 카테고리 | ${this.category[0]} | ${this.category[1]} | ${this.category[2]} | ${this.category[3]} | ${this.category[4]} ]`);

    for (const coach of this.coaches) {
      OutputView.printMessage(`[ ${coach} | ${this.getMenu(0)} | ${this.getMenu(1)} | ${this.getMenu(2)} | ${this.getMenu(3)} | ${this.getMenu(4)} ]`);
    }
    OutputView.printMessage('추천을 완료했습니다.\n');
  }

  getMenu(index) {
    const foodList = Menu[this.category[index]];

    const menu = shuffle(foodList)[0];
    return menu;
  }
}

export default App;
