import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './models/token-payload';

@Injectable()
export class AuthenticationService {
  constructor(private readonly _jwtService: JwtService) {}

  async generateToken(email: string): Promise<string> {
    const payload: TokenPayload = { email };
    return this._jwtService.signAsync(payload);
  }

  async validateToken(token: string): Promise<TokenPayload> {
    const payload = await this._jwtService.verifyAsync(token);
    return new TokenPayload(payload.email);
  }
}
