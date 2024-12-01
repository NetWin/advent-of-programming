import * as fs from 'fs';

export async function challenge02(): Promise<void> {
  // Read the input file and sort it into the corresponding lists
  const leftList: Array<number> = [];
  const rightList: Array<number> = [];
  fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .split('\n')
    .map((line) => line.split(/\s+/).map((n) => parseInt(n.trim(), 10)) as [number, number])
    .map(([left, right]) => {
      if (!isNaN(left)) leftList.push(left);
      if (!isNaN(right)) rightList.push(right);
    });

  // Setup some state
  const leftListSorted = leftList.toSorted((a, b) => Math.sign(a - b));
  const rightListSorted = rightList.toSorted((a, b) => Math.sign(a - b));
  const timesANumberAppearsInRightList = new Map<number, number>();

  // Setup a map that maps every number of the right list with the number of times it appeared in it
  // Improvement i'm to lazy for right now:
  //   build the "timesANumberAppearsInRightList" map while reading in the values above.
  for (const num of rightListSorted) {
    const times = timesANumberAppearsInRightList.get(num) ?? 0;
    timesANumberAppearsInRightList.set(num, times + 1);
  }

  // Multiply every number in the left list with the number of times it appears in the right one
  // and sum the results up
  const similarityScore = leftListSorted
    .map((n) => n * (timesANumberAppearsInRightList.get(n) ?? 0))
    .reduce((acc, cur) => acc + cur, 0);

  const solution = 23927637;
  console.info('Similarity score: ', similarityScore, ' | Correct: ', similarityScore === solution);
}
