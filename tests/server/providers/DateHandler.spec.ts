import { DateHandler } from '../../../src/server/providers/DateHandler';

describe('Provider: DateHandler', () => {
  const dateNowMock = jest.fn();

  Date.now = dateNowMock;

  describe('getToday', () => {
    const dateInMilisecondsMock = 1649732400000; // Date: 12/04/2022T03:00:00

    dateNowMock.mockReturnValue(dateInMilisecondsMock);

    it('Should return today date formatted', () => {
      const result = DateHandler.getToday();

      expect(result).toBe('12/4/2022');
    });
  });

  describe('getFormatted', () => {
    const dateMock = new Date('2022/04/14');

    it('Should return the date formatted', () => {
      const result = DateHandler.getFormatted(dateMock);

      expect(result).toBe('14/4/2022');
    });

    it('Should return the day with non-zero when the day is less than 10', () => {
      const dateLessThan10Mock = new Date('2022/05/09');

      const result = DateHandler.getFormatted(dateLessThan10Mock);

      expect(result).toBe('9/5/2022');
    });
  });
});
