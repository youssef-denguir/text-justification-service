import { WordSplitter } from '@/core/formatters/word-splitter';

describe('WordSplitter', () => {
  let service: WordSplitter;
  beforeEach(() => {
    service = new WordSplitter();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should split text into words', () => {
    const input = 'text    one left';
    const expected = ['text', 'one', 'left'];
    const maxLineLength = 50;
    expect(service.split(input, maxLineLength)).toEqual(expected);
  });

  it('should split long words depending on maxLineLength', () => {
    const input = 'yousseftest another word';
    const expected = ['yousseft', 'est', 'another', 'word'];
    const maxLineLength = 8;
    expect(service.split(input, maxLineLength)).toEqual(expected);
  });
});
