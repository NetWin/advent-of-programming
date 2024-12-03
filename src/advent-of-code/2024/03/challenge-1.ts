import * as fs from 'fs';

export async function challenge01(): Promise<void> {
  const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').trim();

  let sum = 0;

  // Just iterate over every occurence of the multiply instruction
  // and sum up their multiplication result. That's it 🤷
  input.replace(/mul\((\d+),(\d+)\)/g, (_, l, r) => {
    const left = parseInt(l, 10);
    const right = parseInt(r, 10);
    sum += left * right;
    return '';
  });

  const solution = 184122457;
  console.info('Summed up multiplications: ', sum, ' | Correct: ', sum === solution);
}
