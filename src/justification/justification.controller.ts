import {
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
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
import { JUSTIFICATION_LINE_LENGTH } from '@/core/constants';
import { WordSplitter } from '@/core/formatters/word-splitter';
import { TextJustificationGuard } from '@/rate-limiting/text-justification/text-justification-guard';
import { WordsCountStore } from '@/rate-limiting/text-justification/words-count.store';

@ApiTags('Text justifcation')
@ApiBearerAuth()
@UseGuards()
@UseGuards(AuthenticationGuard)
@Controller('justify')
export class JustificationController {
  constructor(
    private readonly justificationService: JustificationService,
    private readonly wordsCountStore: WordsCountStore,
  ) {}

  @Post()
  @UseGuards(TextJustificationGuard)
  @Header('Content-Type', 'text/plain')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('text/plain')
  @ApiBody({ type: String })
  @ApiOkResponse({ type: TextJustificationResponse })
  async JustifyText(
    @Req() request: Request & { tokenPayload },
  ): Promise<string> {
    const { email } = request.tokenPayload;
    const text: string = request.body;

    const textWords = new WordSplitter().split(text, JUSTIFICATION_LINE_LENGTH);
    const justifiedText = this.justificationService.justifyText(textWords);

    const cacheRecord = this.wordsCountStore.get(email);
    this.wordsCountStore.set(email, {
      date: cacheRecord.date,
      count: cacheRecord.count + textWords.length,
    });
    return justifiedText;
  }
}
