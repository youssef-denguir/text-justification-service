import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GenerateTokenRequest } from './dto/generate-token-request';
import { GenerateTokenResponse } from './dto/generate-token-response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/generate-token')
  @ApiOkResponse({
    type: GenerateTokenResponse,
    description: 'Generated access token',
  })
  async generateToken(
    @Body() request: GenerateTokenRequest,
  ): Promise<GenerateTokenResponse> {
    const token = await this._authenticationService.generateToken(
      request.email,
    );
    return { access_token: token };
  }
}
