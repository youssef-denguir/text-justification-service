import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { JustificationModule } from './justification/justification.module';
import { ConfigModule } from '@nestjs/config';
import { RateLimitingModule } from './rate-limiting/rate-limiting.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationModule,
    JustificationModule,
    RateLimitingModule,
  ],
})
export class AppModule {}
