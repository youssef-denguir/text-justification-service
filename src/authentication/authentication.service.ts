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
    return this._jwtService.verifyAsync(token);
  }
}
