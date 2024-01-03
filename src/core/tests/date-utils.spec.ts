import { DateUtils } from '@/core/utils/date-utils';

describe('Dateutils', () => {
  let utils: DateUtils;
  beforeEach(() => {
    utils = new DateUtils();
  });

  it('should be defined', () => {
    expect(utils).toBeDefined();
  });

  describe('isCurrentDay', () => {
    it('should return true when it is the same day', () => {
      const now = new Date();
      expect(utils.isCurrentDay(now)).toEqual(true);
    });

    it('should return false when it is a different day', () => {
      const now = new Date();
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      expect(utils.isCurrentDay(yesterday)).toEqual(false);
    });
  });
});
