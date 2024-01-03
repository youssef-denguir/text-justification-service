import { Test, TestingModule } from '@nestjs/testing';
import { JustificationService } from '../justification.service';
import { LineJustificationStrategyProvider } from '../text-jutification-strategies/text-justification-provider';

describe('JustificationService', () => {
  let service: JustificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JustificationService, LineJustificationStrategyProvider],
    }).compile();

    service = module.get<JustificationService>(JustificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be left justified when having only one line', () => {
    const input = 'text    one left';
    const expected = 'text one left'.concat(' '.repeat(67));
    expect(service.justifyText(input)).toEqual(expected);
  });

  it('should be justified when having only one word', () => {
    // 40 characters consisting of 4 characters words + 9 spaces in between + 31 remaining spaces
    // we already have an extra space for the last word
    const input = 'text   '.repeat(10);
    const expected = 'text '.repeat(10).concat(' '.repeat(30));
    expect(service.justifyText(input)).toEqual(expected);
  });

  it('should be split into multiple lines when word exceeds line length', () => {
    const input = 'text'.repeat(30); // 120 characters => max is 80 per line
    // the text should be split into two lines, 1 having 80 characters of the text without spaces
    // and the second should have 40 characters and the remaining filled with spaces
    const expected = 'text'
      .repeat(20)
      .concat('\n')
      .concat('text'.repeat(10))
      .concat(' '.repeat(40));
    expect(service.justifyText(input)).toEqual(expected);
  });

  it('should have two lines, the first is full justified and the second (last) is left justified', () => {
    const input = 'abc '.repeat(30); // 120 characters => max is 80 per line
    // first spacing should be two spaces (one extra space after evenly distributing the spaces)
    const expected = 'abc  '
      .concat('abc '.repeat(18))
      .concat('abc')
      .concat('\n')
      .concat('abc '.repeat(10))
      .concat(' '.repeat(40));
    expect(service.justifyText(input)).toEqual(expected);
  });
});
