import * as fs from 'fs';

const Directions = {
  TopRight: { x: 1, y: -1 },
  TopLeft: { x: -1, y: -1 },
  BottomRight: { x: 1, y: 1 },
  BottomLeft: { x: -1, y: 1 }
} as const;

type Direction = (typeof Directions)[keyof typeof Directions];

export async function challenge02(): Promise<void> {
  const input = fs
    .readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .trim()
    .split('\n')
    .map((s) => s.trim().split(''));

  let numberOfWords = 0;

  // Get a neighboring character from the given location
  const getChar = (x: number, y: number, dir: Direction): string => {
    const targetX = x + dir.x;
    const targetY = y + dir.y;
    if (targetX >= 0 && targetX <= input[0].length && targetY >= 0 && targetY < input.length) {
      return input[targetY][targetX];
    }
    return '';
  };

  // Maybe brute force? But i can't come up with a smarter solution right now 😅
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      // Trace steps in all directions whenever we find an "A"
      if (input[y][x] === 'A') {
        // Every X-MAS has an "A" in the Middle and is surrounded by 2 "M" and 2 "S"
        const counts: Record<string, number> = { X: 0, M: 0, A: 0, S: 0, '': 0 };
        const TL = getChar(x, y, Directions.TopLeft);
        const TR = getChar(x, y, Directions.TopRight);
        const BL = getChar(x, y, Directions.BottomLeft);
        const BR = getChar(x, y, Directions.BottomRight);
        counts[TL]++;
        counts[TR]++;
        counts[BL]++;
        counts[BR]++;

        // We found 2 "M" and 2 "S" **and**
        // the corresponding directions contain different letters because "SAS"/"MAM" are invalid
        if (counts['M'] === 2 && counts['S'] === 2 && TL !== BR) {
          numberOfWords++;
        }
      }
    }
  }

  const solution = 1745;
  console.info('X-MAS found: ', numberOfWords, ' | Correct? ', numberOfWords === solution);
}
