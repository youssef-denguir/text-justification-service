export class WordSplitter {
  split(text: string, maxWordLength: number) {
    const textWords: string[] = text.split(/\s+/);
    //check if the is strings with length higher than maxWidth and split them into two strings
    if (textWords.every((word) => word.length <= maxWordLength)) {
      return textWords;
    }

    const result: string[] = [];
    for (const word of textWords) {
      if (word.length > maxWordLength) {
        // If the string exceeds the limit, split it into smaller strings
        let currentIndex = 0;
        while (currentIndex < word.length) {
          const endIndex = currentIndex + maxWordLength;
          const substring = word.substring(currentIndex, endIndex);
          result.push(substring);
          currentIndex += maxWordLength;
        }
      } else {
        result.push(word);
      }
    }

    return result;
  }
}
