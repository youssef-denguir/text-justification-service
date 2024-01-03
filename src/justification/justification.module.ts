import { Module } from '@nestjs/common';
import { JustificationService } from './justification.service';
import { JustificationController } from './justification.controller';
import { LineJustificationStrategyProvider } from './text-jutification-strategies/text-justification-provider';
import { RateLimitingModule } from '@/rate-limiting/rate-limiting.module';

@Module({
  imports: [RateLimitingModule],
  controllers: [JustificationController],
  providers: [JustificationService, LineJustificationStrategyProvider],
})
export class JustificationModule {}
