import { Test, TestingModule } from '@nestjs/testing';
import { JustificationController } from '../justification.controller';
import { JustificationService } from '../justification.service';
import { LineJustificationStrategyProvider } from '../text-jutification-strategies/text-justification-provider';
import { AuthenticationService } from '@/authentication/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticatedRequest } from '@/core/types/authenticated-request';
import { RateLimitingModule } from '@/rate-limiting/rate-limiting.module';

describe('AuthenticationController', () => {
  let controller: JustificationController;
  let service: JustificationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, RateLimitingModule],
      controllers: [JustificationController],
      providers: [
        JustificationService,
        LineJustificationStrategyProvider,
        AuthenticationService,
      ],
    }).compile();

    controller = module.get<JustificationController>(JustificationController);
    service = module.get<JustificationService>(JustificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should parse body and return object', () => {
    const input = 'text    one left';
    const request = { body: input, tokenPayload: { email: "youssef@gmail.com"} } as AuthenticatedRequest;
    const result = controller.justifyText(request);
    const expected = 'text one left'.concat(' '.repeat(67));
    expect(result.justified_text).toEqual(expected);
  });
});
