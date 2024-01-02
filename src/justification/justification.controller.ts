import {
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { JustificationService } from './justification.service';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TextJustificationResponse } from './dto/text-justification-response';

@ApiTags('Text justifcation')
@Controller('justify')
export class JustificationController {
  constructor(private readonly justificationService: JustificationService) {}

  @Post()
  @Header('Content-Type', 'text/plain')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('text/plain')
  @ApiBody({ type: String })
  @ApiOkResponse({ type: TextJustificationResponse })
  async JustifyText(@Req() request: RawBodyRequest<Request>): Promise<string> {
    console.log(request.rawBody);
    const justifiedText = this.justificationService.justifyText(
      request.rawBody?.toString('utf-8'),
    );
    return justifiedText;
  }
}
