import {
  JUSTIFICATION_LINE_LENGTH,
  WORDS_COUNT_LIMIT_PER_DAY,
} from '@/core/constants';
import { PaymentRequiredException } from '@/core/exceptions/payment-required-exception';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { WordsCountStore } from './words-count.store';
import { WordSplitter } from '@/core/formatters/word-splitter';
import { DateUtils } from '@/core/utils/date-utils';

@Injectable()
export class TextJustificationGuard implements CanActivate {
  constructor(private readonly wordsCountCache: WordsCountStore) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const text = request.body;
    if (!text) {
      throw new BadRequestException('No text was provided!');
    }

    const words = new WordSplitter().split(text, JUSTIFICATION_LINE_LENGTH);
    const { email } = request.tokenPayload;
    let cachedRecord = this.wordsCountCache.get(email);
    const dateUtils = new DateUtils();
    if (!cachedRecord || !dateUtils.isCurrentDay(cachedRecord.date)) {
      cachedRecord = { date: new Date(), count: 0 };
      this.wordsCountCache.set(email, cachedRecord);
    }

    if (words.length + cachedRecord.count > WORDS_COUNT_LIMIT_PER_DAY) {
      throw new PaymentRequiredException(
        `You can't exceed ${WORDS_COUNT_LIMIT_PER_DAY} words per day! Payment is required to unlock more usage`,
      );
    }

    return true;
  }
}
