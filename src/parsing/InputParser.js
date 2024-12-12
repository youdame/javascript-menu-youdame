class InputParser {
  /**
   * [이름-숫자] 반복 패턴 파싱
   * @param {string} input - 입력값
   * @returns {Array<{name: string, number: number}>} - 파싱된 객체 배열
   */
  static parseBracketNameNumber(input) {
    const pattern = /^\[([가-힣a-zA-Z]+)-(\d+)\](,\[([가-힣a-zA-Z]+)-(\d+)\])*$/;
    if (!pattern.test(input)) {
      return null;
    }

    const matches = [...input.matchAll(/\[([가-힣a-zA-Z]+)-(\d+)\]/g)];
    return matches.map(([_, name, number]) => ({
      name,
      number: parseInt(number, 10),
    }));
  }

  /**
   * 이름-숫자 반복 패턴 파싱
   * @param {string} input - 입력값
   * @returns {Array<{name: string, number: number}>} - 파싱된 객체 배열
   */
  static parseNameNumber(input) {
    const pattern = /^([가-힣a-zA-Z]+)-(\d+)(,([가-힣a-zA-Z]+)-(\d+))*$/;
    if (!pattern.test(input)) {
      return null;
    }

    const matches = [...input.matchAll(/([가-힣a-zA-Z]+)-(\d+)/g)];
    return matches.map(([_, name, number]) => ({
      name,
      number: parseInt(number, 10),
    }));
  }

  /**
   * 숫자 반복 패턴 파싱
   * @param {string} input - 입력값
   * @returns {Array<number>} - 숫자 배열
   */
  static parseNumbers(input) {
    const pattern = /^\d+(,\d+)*$/;
    if (!pattern.test(input)) {
      return null;
    }

    return input.split(',').map(Number);
  }

  /**
   * 이름 반복 패턴 파싱
   * @param {string} input - 입력값
   * @returns {Array<string>} - 이름 배열
   */
  static parseNames(input) {
    const pattern = /^([가-힣a-zA-Z]+)(,([가-힣a-zA-Z]+))*$/;
    if (!pattern.test(input)) {
      return null;
    }

    return input.split(',').map((name) => name.trim());
  }
}

export default InputParser;
