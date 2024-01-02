import { FullJustificationStrategy } from './full-text-justification';
import { LeftJustificationStrategy } from './left-text-jusitifcation';
import { ILineJusificationStrategy } from './abstractions/text-justification-strategy.interface';
import { JustificationType } from './text-justification-type';

export class LineJustificationStrategyProvider {
  getTextJustificationStrategy(
    type: JustificationType,
  ): ILineJusificationStrategy {
    switch (type) {
      case JustificationType.Left:
        return new LeftJustificationStrategy();
      case JustificationType.Full:
      default:
        return new FullJustificationStrategy();
    }
  }
}
