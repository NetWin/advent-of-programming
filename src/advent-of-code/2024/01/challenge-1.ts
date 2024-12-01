import * as fs from 'fs';

export async function challenge01(): Promise<void> {
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

  // Sum up the difference between ever left and right list entry
  const sum = leftListSorted
    .map((left, i) => Math.abs(left - rightListSorted[i]!))
    .reduce((acc, prev) => acc + prev, 0);

  const solution = 2815556;
  console.info('Sum of distances: ', sum, ' | Correct: ', sum === solution);
}
