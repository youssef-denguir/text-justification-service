import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe("Generate token endpoint", () => {
      it('returns 200 (Ok)', () => {
        return request(app.getHttpServer())
          .post('/authentication/generate-token')
          .send({ email: "youssef@gmail.com"})
          .expect(HttpStatus.OK)
      });

      it('returns 400 (Bad Request)', () => {
        return request(app.getHttpServer())
          .post('/authentication/generate-token')
          .send({ email: "youssef "})
          .expect(HttpStatus.BAD_REQUEST)
      });
  });
});
