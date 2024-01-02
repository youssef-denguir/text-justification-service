import { Module } from '@nestjs/common';
import { JustificationService } from './justification.service';
import { JustificationController } from './justification.controller';
import { LineJustificationStrategyProvider } from './text-jutification-strategies/text-justification-provider';

@Module({
  controllers: [JustificationController],
  providers: [JustificationService, LineJustificationStrategyProvider],
})
export class JustificationModule {}
