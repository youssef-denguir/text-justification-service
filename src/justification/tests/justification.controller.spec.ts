import { Test, TestingModule } from '@nestjs/testing';
import { JustificationController } from '../justification.controller';
import { JustificationService } from '../justification.service';
import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { LineJustificationStrategyProvider } from '../text-jutification-strategies/text-justification-provider';
import { AuthenticationService } from '@/authentication/authentication.service';
import { JwtModule } from '@nestjs/jwt';

describe('AuthenticationController', () => {
  let controller: JustificationController;
  let service: JustificationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [JustificationController],
      providers: [JustificationService, LineJustificationStrategyProvider, AuthenticationService],
    }).compile();

    controller = module.get<JustificationController>(JustificationController);
    service = module.get<JustificationService>(JustificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should parse body and return object', () => {
    jest
      .spyOn(service, 'justifyText')
      .mockImplementation((textWords: string) => textWords);

    const input = 'some text';
    const result = controller.justifyText({
      rawBody: Buffer.from(input, 'utf-8'),
    } as RawBodyRequest<Request>);

    expect(result).toEqual(input);
  });
});
