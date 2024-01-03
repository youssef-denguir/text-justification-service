import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { JustificationModule } from './justification/justification.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationModule,
    JustificationModule,
  ],
})
export class AppModule {}
