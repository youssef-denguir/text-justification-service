import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../authentication.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { TokenPayload } from '../models/token-payload';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'testSecret' })],
      providers: [AuthenticationService, AuthenticationGuard],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    guard = module.get<AuthenticationGuard>(AuthenticationGuard);
  });

  it('should return true and set tokenPayload', async () => {
    const email = 'youssef@gmail.com';
    const token = await jwtService.signAsync({ email });
    const request: any = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const executionContextMock = {
      switchToHttp: () =>
        ({
          getRequest: () => request,
        }) as HttpArgumentsHost,
    } as ExecutionContext;

    const result = await guard.canActivate(executionContextMock);
    expect(result).toEqual(true);
    expect(request.tokenPayload).toBeInstanceOf(TokenPayload);
    expect(request.tokenPayload.email).toEqual(email);
  });

  it('should throw unauthorized exception when authorization header is not present', async () => {
    const request: any = { headers: {} };
    const executionContextMock = {
      switchToHttp: () =>
        ({
          getRequest: () => request,
        }) as HttpArgumentsHost,
    } as ExecutionContext;

    const result = guard.canActivate(executionContextMock);
    await expect(result).rejects.toThrow(UnauthorizedException);
  });

  it('should throw unauthorized exception when token is invalid', async () => {
    const email = 'youssef@gmail.com';
    const token = await jwtService.signAsync(
      { email },
      { secret: 'differentSecret' },
    );
    const request: any = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const executionContextMock = {
      switchToHttp: () =>
        ({
          getRequest: () => request,
        }) as HttpArgumentsHost,
    } as ExecutionContext;

    const result = guard.canActivate(executionContextMock);
    await expect(result).rejects.toThrow(UnauthorizedException);
  });
});
