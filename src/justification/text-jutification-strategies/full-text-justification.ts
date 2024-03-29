import { ILineJusificationStrategy } from './abstractions/text-justification-strategy.interface';

/**
 * A strategy for full justification. It concatenates the lines' words, and tries
 * to fit equal spaces between them.
 *
 * @class FullJustificationStrategy
 * @implements {ILineJusificationStrategy}
 */
export class FullJustificationStrategy implements ILineJusificationStrategy {
  justify(words: string[], lineWidth: number): string {
    const lineLength = words.reduce((acc, word) => acc + word.length, 0);
    const totalSpaces: number = lineWidth - lineLength;
    const spacesBetweenWords: number = Math.floor(
      totalSpaces / (words.length - 1),
    );

    let extraSpaces: number = totalSpaces % (words.length - 1);
    let line: string = words[0];

    for (let i = 1; i < words.length; i++) {
      const spaces: string = ' '.repeat(
        extraSpaces > 0 ? spacesBetweenWords + 1 : spacesBetweenWords,
      );
      extraSpaces--;
      line += spaces.concat(words[i]);
    }

    return line;
  }
}
