import { Test, TestingModule } from '@nestjs/testing';

import { TextJustificationGuard } from '../text-justification/text-justification-guard';
import { WordsCountStore } from '../text-justification/words-count.store';
import { ExecutionContext, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { PaymentRequiredException } from '@/core/exceptions/payment-required-exception';
import { BadRequestException } from '@nestjs/common';
import { WORDS_COUNT_LIMIT_PER_DAY } from '@/core/constants';

describe('TextJustificationGuard', () => {
  let guard: TextJustificationGuard;
  let cache: WordsCountStore;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordsCountStore, TextJustificationGuard],
    }).compile();

    cache = module.get<WordsCountStore>(WordsCountStore);
    guard = module.get<TextJustificationGuard>(TextJustificationGuard);
  });

  it('should return true when the cache does not contain the user', () => {
    const email = 'youssef@gmail.com';
    expect(cache.get(email)).toBeUndefined();
    const request: any = {
      tokenPayload: { email },
      body: 'some text',
    };

    const executionContextMock = {
      switchToHttp: () =>
        ({
          getRequest: () => request,
        }) as HttpArgumentsHost,
    } as ExecutionContext;

    const result = guard.canActivate(executionContextMock);
    expect(result).toEqual(true);
    expect(cache.get(email).count).toEqual(0);
  });

  it('should throw bad request exception when body is empty', () => {
    const email = 'youssef@gmail.com';
    const request: any = {
      tokenPayload: { email },
    };

    const executionContextMock = {
      switchToHttp: () =>
        ({
          getRequest: () => request,
        }) as HttpArgumentsHost,
    } as ExecutionContext;

    const fn = () => guard.canActivate(executionContextMock);
    expect(fn).toThrow(BadRequestException);
  });

  it('should throw PaymentRequiredException when exceeding allowed count for current day', () => {
    const email = 'youssef@gmail.com';
    cache.set(email, { date: new Date(), count: WORDS_COUNT_LIMIT_PER_DAY });
    const request: any = {
      tokenPayload: { email },
      body: 'some text',
    };

    const executionContextMock = {
      switchToHttp: () =>
        ({
          getRequest: () => request,
        }) as HttpArgumentsHost,
    } as ExecutionContext;

    const fn = () => guard.canActivate(executionContextMock);
    expect(fn).toThrow(PaymentRequiredException);
  });

  it('should return true when cache contains exceeded words count for a different day', () => {
    const email = 'youssef@gmail.com';
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    cache.set(email, { date: yesterday, count: WORDS_COUNT_LIMIT_PER_DAY });

    const request: any = {
      tokenPayload: { email },
      body: 'some text',
    };

    const executionContextMock = {
      switchToHttp: () =>
        ({
          getRequest: () => request,
        }) as HttpArgumentsHost,
    } as ExecutionContext;

    expect(guard.canActivate(executionContextMock)).toEqual(true);
    expect(cache.get(email)).toEqual({ date: now, count: 0 });
  });
});
