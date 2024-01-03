import { Injectable } from '@nestjs/common';
import { LineJustificationStrategyProvider } from './text-jutification-strategies/text-justification-provider';
import { JustificationType } from './text-jutification-strategies/text-justification-type';
import { JUSTIFICATION_LINE_LENGTH } from '@/core/constants';

@Injectable()
export class JustificationService {
  constructor(
    private readonly textJustificationStrategyProvider: LineJustificationStrategyProvider,
  ) {}

  /**
   * Description placeholder
   * @date 1/2/2024 - 9:18:13 PM
   *
   * @param {string[]} words
   * @returns {string}
   */
  justifyText(words: string[]): string {
    const result: string[] = [];
    const wordsPerLine: string[][] = this.groupWordsByLine(words);

    for (let i = 0; i < wordsPerLine.length; i++) {
      const currentLineWords: string[] = wordsPerLine[i];

      const isLastLine = i === wordsPerLine.length - 1;
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
        JUSTIFICATION_LINE_LENGTH,
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
        lineLength + 1 + words[i].length > JUSTIFICATION_LINE_LENGTH;
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
}
