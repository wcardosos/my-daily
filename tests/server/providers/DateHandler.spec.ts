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
});
