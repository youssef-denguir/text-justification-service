import { Module } from '@nestjs/common';
import { JustificationService } from './justification.service';
import { JustificationController } from './justification.controller';
import { LineJustificationStrategyProvider } from './text-jutification-strategies/text-justification-provider';
import { RateLimitersModule } from '@/rate-limiters/rate-limiters.module';

@Module({
  imports: [RateLimitersModule],
  controllers: [JustificationController],
  providers: [JustificationService, LineJustificationStrategyProvider],
})
export class JustificationModule {}
