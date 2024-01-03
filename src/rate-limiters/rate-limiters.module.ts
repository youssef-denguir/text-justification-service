import { Module } from '@nestjs/common';
import { WordsCountStore } from './text-justification/words-count.store';

@Module({
  providers: [WordsCountStore],
  exports: [WordsCountStore], 
})
export class RateLimitersModule {}
