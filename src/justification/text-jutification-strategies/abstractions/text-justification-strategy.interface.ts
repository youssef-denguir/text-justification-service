export interface ILineJusificationStrategy {
  justify(words: string[], lineWidth: number): string;
}
