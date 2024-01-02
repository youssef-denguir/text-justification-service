import { ILineJusificationStrategy } from './abstractions/text-justification-strategy.interface';

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
