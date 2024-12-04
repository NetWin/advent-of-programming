import * as fs from 'fs';

const Directions = {
  LeftToRight: { x: 1, y: 0 },
  RightToLeft: { x: -1, y: 0 },
  TopToBottom: { x: 0, y: 1 },
  BottomToTop: { x: 0, y: -1 },
  BottomLeftToTopRight: { x: 1, y: -1 },
  BottomRightToTopLeft: { x: -1, y: -1 },
  TopLeftToBottomRight: { x: 1, y: 1 },
  TopRightToBottomLeft: { x: -1, y: 1 }
} as const;

type Direction = (typeof Directions)[keyof typeof Directions];

export async function challenge01(): Promise<void> {
  const input = fs
    .readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .trim()
    .split('\n')
    .map((s) => s.trim().split(''));

  const searchWord = 'XMAS';

  let numberOfWords = 0;

  // Just go into a given direction starting at a given location and check if we can find the searched word
  const searchInDirection = (x: number, y: number, dir: Direction): void => {
    let index = 0;
    while (x >= 0 && x <= input[0].length && y >= 0 && y < input.length) {
      // Whenever we find a letter that is not at the current index of the searched word
      // Just stop
      if (input[y][x] !== searchWord[index]) {
        break;
      }

      // We found all letters of the searchWord 🎉
      if (index === searchWord.length - 1) {
        numberOfWords++;
      }

      // Next step
      index++;
      x += dir.x;
      y += dir.y;
    }
  };

  // Maybe brute force? But i can't come up with a smarter solution right now 😅
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      // Trace steps in all directions whenever we find the first letter of the searched word
      if (input[y][x] === searchWord[0]) {
        searchInDirection(x, y, Directions.LeftToRight);
        searchInDirection(x, y, Directions.RightToLeft);
        searchInDirection(x, y, Directions.TopToBottom);
        searchInDirection(x, y, Directions.BottomToTop);
        searchInDirection(x, y, Directions.BottomLeftToTopRight);
        searchInDirection(x, y, Directions.BottomRightToTopLeft);
        searchInDirection(x, y, Directions.TopLeftToBottomRight);
        searchInDirection(x, y, Directions.TopRightToBottomLeft);
      }
    }
  }

  const solution = 2297;
  console.info('Times XMAS is included: ', numberOfWords, ' | Correct? ', numberOfWords === solution);
}
