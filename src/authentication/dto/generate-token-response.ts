import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class GenerateTokenResponse {
  @ApiProperty()
  @IsJWT()
  access_token: string;
}
