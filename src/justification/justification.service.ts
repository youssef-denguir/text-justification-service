import { Injectable } from '@nestjs/common';
import { LineJustificationStrategyProvider } from './text-jutification-strategies/text-justification-provider';
import { JustificationType } from './text-jutification-strategies/text-justification-type';

@Injectable()
export class JustificationService {
  private readonly lineWidth: number = 80;

  constructor(
    private readonly textJustificationStrategyProvider: LineJustificationStrategyProvider,
  ) {}

  justifyText(text: string): string {
    let textWords: string[] = text.split(/\s+/);

    //check if the is strings with length higher than maxWidth and split them into two strings
    if (textWords.some((word) => word.length > this.lineWidth)) {
      textWords = this.splitLongWords(textWords);
    }

    return this.fullJustify(textWords);
  }

  /**
   * Description placeholder
   * @date 1/2/2024 - 9:18:13 PM
   *
   * @param {string[]} words
   * @returns {string}
   */
  fullJustify(words: string[]): string {
    const result: string[] = [];
    const wordsPerLine: string[][] = this.groupWordsByLine(words);

    for (let i = 0; i < wordsPerLine.length; i++) {
      const currentLineWords: string[] = wordsPerLine[i];

      const isLastLine = i === wordsPerLine.length;
      const justificationType: JustificationType = this.getJustificationType(
        currentLineWords.length,
        isLastLine,
      );
      const lineJustificationStrategy =
        this.textJustificationStrategyProvider.getTextJustificationStrategy(
          justificationType,
        );

      const justifiedLine = lineJustificationStrategy.justify(
        currentLineWords,
        this.lineWidth,
      );
      result.push(justifiedLine);
    }

    return result.join('\n');
  }

  /**
   * Resolves the justifiction type for the current line
   * If the line contains only one word or it is the last line in the text, it return left justification
   * else it returns full justification
   * @param {number} currentLineWordsLength
   * @param {boolean} isLastLine
   * @returns {JustificationType}
   */
  private getJustificationType(
    currentLineWordsLength: number,
    isLastLine: boolean,
  ): JustificationType {
    if (currentLineWordsLength === 1 || isLastLine) {
      return JustificationType.Left;
    }

    return JustificationType.Full;
  }

  /**
   * Description placeholder
   *
   * @param {string[]} words
   * @returns {string[][]}
   */
  private groupWordsByLine(words: string[]): string[][] {
    const result: string[][] = [];

    // include first word in the current line (word can't exceed line length)
    let currentLine = [];
    currentLine.push(words[0]);
    let lineLength: number = words[0].length;

    for (let i = 1; i < words.length; i++) {
      const cannotFitWordInLine =
        lineLength + 1 + words[i].length > this.lineWidth;
      if (cannotFitWordInLine) {
        // push the line words list to result
        result.push(currentLine);

        // create a new line with the current word that we couldn't fit into previous line
        currentLine = [words[i]];
        lineLength = words[i].length;
      } else {
        // append word to the current line
        currentLine.push(words[i]);
        lineLength += 1 + words[i].length;
      }
    }

    // push last line
    result.push(currentLine);
    return result;
  }

  /**
   * Description placeholder
   *
   * @param {string[]} strings
   * @returns {string[]}
   */
  private splitLongWords(strings: string[]): string[] {
    const result: string[] = [];

    for (const word of strings) {
      if (word.length > this.lineWidth) {
        // If the string exceeds the limit, split it into smaller strings
        let currentIndex = 0;
        while (currentIndex < word.length) {
          const endIndex = currentIndex + this.lineWidth;
          const substring = word.substring(currentIndex, endIndex);
          result.push(substring);
          currentIndex += this.lineWidth;
        }
      } else {
        result.push(word);
      }
    }

    return result;
  }
}
