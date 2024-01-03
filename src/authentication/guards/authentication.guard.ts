import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { TokenPayload } from '../models/token-payload';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly _authService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Please provide an access token!');
    }

    const token = authorizationHeader.split(' ')?.[1];
    let payload: TokenPayload = null;

    // Swallow exception to prevent returning ServerException for invalid tokens
    try {
      payload = await this._authService.validateToken(token);
    } catch {}

    if (!payload) {
      throw new UnauthorizedException('Invalid token!');
    }

    request.tokenPayload = payload;
    return true;
  }
}
