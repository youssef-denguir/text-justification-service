import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { JustificationModule } from './justification/justification.module';
import { ConfigModule } from '@nestjs/config';
import { RateLimitersModule } from './rate-limiters/rate-limiters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationModule,
    JustificationModule,
    RateLimitersModule,
  ],
})
export class AppModule {}
