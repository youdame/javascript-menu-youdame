import { MissionUtils } from '@woowacourse/mission-utils';
import App from '../src/App.js';
import shuffle from '../src/util/shuffle.js';

const mockQuestions = (inputs) => {
  const messages = [];

  MissionUtils.Console.readLineAsync = jest.fn((prompt) => {
    messages.push(prompt);
    const input = inputs.shift();

    if (input === undefined) {
      throw new Error('NO INPUT');
    }

    return Promise.resolve(input);
  });

  MissionUtils.Console.readLineAsync.messages = messages;
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => acc.mockReturnValueOnce(number), MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  return logSpy;
};

const getOutput = (logSpy) => [...logSpy.mock.calls].join('');

const expectLogContains = (received, logs) => {
  logs.forEach((log) => {
    expect(received).toEqual(expect.stringContaining(log));
  });
};

const mockShuffles = (rows) => {
  MissionUtils.Random.shuffle = jest.fn();

  rows.reduce(
    (acc, [firstNumber, numbers]) => acc.mockReturnValueOnce([firstNumber, ...numbers.filter((number) => number !== firstNumber)]),
    MissionUtils.Random.shuffle,
  );
};

describe('점심 메뉴 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('전체 기능 테스트', () => {
    test('카테고리 메뉴 중복 없는 추천', async () => {
      // 테스트에 async 추가
      const logSpy = getLogSpy();

      mockRandoms([2, 5, 1, 3, 4]);
      mockQuestions(['구구,제임스', '김밥', '떡볶이']);

      const sequenced = (_, idx) => idx + 1;
      mockShuffles([
        [2, Array.from({ length: 9 }, sequenced)],
        [7, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
        [2, Array.from({ length: 9 }, sequenced)],
        [9, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
      ]);

      const app = new App();
      await app.run(); // app.run()이 비동기 함수라면 await 추가

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

// describe('기능 테스트', () => {
//   test('', async () => {
//     // 테스트에 async 추가
//     const logSpy = getLogSpy();

//     mockRandoms([2, 2, 1, 3, 4]);
//     mockQuestions(['토미,제임스,포코', '우동,스시', '뇨끼,월남쌈', '마파두부,고추잡채']);

//     const sequenced = (_, idx) => idx + 1;
//     mockShuffles([
//       [3, Array.from({ length: 9 }, sequenced)],
//       [7, Array.from({ length: 9 }, sequenced)],
//       [1, Array.from({ length: 9 }, sequenced)],
//       [4, Array.from({ length: 9 }, sequenced)],
//       [2, Array.from({ length: 9 }, sequenced)],
//       [9, Array.from({ length: 9 }, sequenced)],
//       [1, Array.from({ length: 9 }, sequenced)],
//       [5, Array.from({ length: 9 }, sequenced)],
//       [5, Array.from({ length: 9 }, sequenced)],
//       [4, Array.from({ length: 9 }, sequenced)],
//     ]);

//     const app = new App();
//     await app.run(); // app.run()이 비동기 함수라면 await 추가

//     const log = getOutput(logSpy);

//     expect(log.replace(/\n/g, '')).toEqual(
//       expect.stringContaining(
//         [
//           '점심 메뉴 추천을 시작합니다.',
//           '메뉴 추천 결과입니다.',
//           '[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]',
//           '[ 카테고리 | 한식 | 한식 | 일식 | 중식 | 아시안 ]',
//           '[ 토미 | 쌈밥 | 김치찌개 | 미소시루 | 짜장면 | 팟타이 ]',
//           '[ 제임스 | 된장찌개 | 비빔밥 | 가츠동 | 토마토 달걀볶음 | 파인애플 볶음밥 ]',
//           '[ 포코 | 된장찌개 | 불고기 | 하이라이스 | 탕수육 | 나시고렝 ]',
//           '추천을 완료했습니다.',
//         ].join(''),
//       ),
//     );
//   });
// });
const Menu = {
  일식: ['규동', '우동', '미소시루', '스시', '가츠동', '오니기리', '하이라이스', '라멘', '오코노미야끼'],
  한식: ['김밥', '김치찌개', '쌈밥', '된장찌개', '비빔밥', '칼국수', '불고기', '떡볶이', '제육볶음'],
  중식: ['깐풍기', '볶음면', '동파육', '짜장면', '짬뽕', '마파두부', '탕수육', '토마토 달걀볶음', '고추잡채'],
  아시안: ['팟타이', '카오 팟', '나시고렝', '파인애플 볶음밥', '쌀국수', '똠얌꿍', '반미', '월남쌈', '분짜'],
  양식: ['라자냐', '그라탱', '뇨끼', '끼슈', '프렌치 토스트', '바게트', '스파게티', '피자', '파니니'],
};
