import { ILineJusificationStrategy } from './abstractions/text-justification-strategy.interface';

/**
 * A strategy for left justification. It concatenates the lines' words list with
 * a space and pads the rest of width with spaces
 * E.g: ["1", "2", "3"] => "1 2 3 {remaining spaces until lineWidth}"
 *
 * @class LeftJustificationStrategy
 * @implements {ILineJusificationStrategy}
 */
export class LeftJustificationStrategy implements ILineJusificationStrategy {
  justify(words: string[], lineWidth: number): string {
    let line: string = words[0];
    for (let i = 1; i < words.length; i++) {
      line += ' '.concat(words[i]);
    }

    line += ' '.repeat(lineWidth - line.length); // Pad remaining width with spaces
    return line;
  }
}
