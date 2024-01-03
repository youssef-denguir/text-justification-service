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
import { TextJustificationResponse } from './dto/text-justification-response';
import { AuthenticationGuard } from '@/authentication/guards/authentication.guard';
import { JUSTIFICATION_LINE_LENGTH } from '@/core/constants';
import { WordSplitter } from '@/core/formatters/word-splitter';
import { TextJustificationGuard } from '@/rate-limiting/text-justification/text-justification-guard';
import { WordsCountStore } from '@/rate-limiting/text-justification/words-count.store';
import { AuthenticatedRequest } from '@/core/types/authenticated-request';

@ApiTags('Text justifcation')
@ApiBearerAuth()
@UseGuards()
@UseGuards(AuthenticationGuard)
@Controller('justify')
export class JustificationController {
  constructor(
    private readonly justificationService: JustificationService,
    private readonly wordsCountStore: WordsCountStore,
  ) { }

  @Post()
  @UseGuards(TextJustificationGuard)
  @Header('Content-Type', 'text/plain')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('text/plain')
  @ApiBody({ type: String })
  @ApiOkResponse({ type: TextJustificationResponse })
  justifyText(@Req() request: AuthenticatedRequest): TextJustificationResponse {
    const { email } = request.tokenPayload;
    const text: string = request.body;

    const textWords = new WordSplitter().split(text, JUSTIFICATION_LINE_LENGTH);
    const justifiedText = this.justificationService.justifyText(textWords);

    const cacheRecord = this.wordsCountStore.get(email);
    this.wordsCountStore.set(email, {
      date: cacheRecord?.date ?? new Date(),
      count: (cacheRecord?.count ?? 0) + textWords.length,
    });
    return { justified_text: justifiedText };
  }
}
