import { TokenPayload } from '@/authentication/models/token-payload';
import { Request } from 'express';

export type AuthenticatedRequest = Request & { tokenPayload: TokenPayload };