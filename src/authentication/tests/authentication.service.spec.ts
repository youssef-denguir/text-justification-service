import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../authentication.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'testSecret' })],
      providers: [AuthenticationService],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  jwtService = module.get<JwtService>(JwtService);
  });

  it('should return an object wrapping the access_token', async () => {
    const email = 'youssef@gmail.com';
    const result = await service.generateToken(email);
    const expectedResult = jwtService.sign({ email });
    expect(result).toEqual(expectedResult);
  });
});
