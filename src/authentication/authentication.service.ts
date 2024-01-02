import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly _jwtService: JwtService) {}

  async generateToken(email: string): Promise<string> {
    const payload = { email: email };
    return this._jwtService.signAsync(payload);
  }
}
