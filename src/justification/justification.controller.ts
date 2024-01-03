import {
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JustificationService } from './justification.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { TextJustificationResponse } from './dto/text-justification-response';
import { AuthenticationGuard } from '@/authentication/guards/authentication.guard';

@ApiTags('Text justifcation')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('justify')
export class JustificationController {
  constructor(private readonly justificationService: JustificationService) {}

  @Post()
  @Header('Content-Type', 'text/plain')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('text/plain')
  @ApiBody({ type: String })
  @ApiOkResponse({ type: TextJustificationResponse })
  justifyText(@Req() request: RawBodyRequest<Request>): string {
    const justifiedText = this.justificationService.justifyText(
      request.rawBody?.toString('utf-8'),
    );
    return justifiedText;
  }
}
