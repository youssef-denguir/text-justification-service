import { InMemoryStore } from '@/core/store/in-memory-store';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WordsCountStore extends InMemoryStore<
  string,
  { count: number; date: Date }
> {}
