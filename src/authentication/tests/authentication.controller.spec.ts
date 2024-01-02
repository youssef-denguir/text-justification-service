import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from '../authentication.controller';
import { AuthenticationService } from '../authentication.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test_secret' })],
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an object wrapping the access_token', async () => {
    const email = 'youssef@gmail.com';
    const result = await controller.generateToken({ email });

    const expectedResult = {
      access_token: jwtService.sign({ email }),
    };

    expect(result).toEqual(expectedResult);
  });

  it('should generate consistent token', async () => {
    const email = 'youssef@gmail.com';
    const expectedResult = {
      access_token: jwtService.sign({ email }),
    };

    let result = await controller.generateToken({ email });
    expect(result).toEqual(expectedResult);

    result = await controller.generateToken({ email });
    expect(result).toEqual(expectedResult);
  });
});
