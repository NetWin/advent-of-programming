import * as fs from 'fs';

export async function challenge02(): Promise<void> {
  const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').trim();

  let sum = 0;

  let isEnabled = true;

  // Just iterate over every occurence of the multiply instruction / do / dont instructions
  // and act accordingly. That's it 🤷
  input.replace(/(?<mul>mul\((\d+),(\d+)\))|(?<do>do\(\))|(?<dont>don't\(\))/g, (s) => {
    if (s === "don't()") {
      // Disable the instructions
      isEnabled = false;
      console.info('\n🚫 DONT!');
    } else if (s === 'do()') {
      // Enable the instructions
      isEnabled = true;
      console.info('\n✅ DO! ');
    } else if (isEnabled) {
      // Sum up the multiplication
      console.info('   INCLUDING: ', s);
      const [, l, r] = /mul\((\d+),(\d+)\)/g.exec(s)!;
      const left = parseInt(l, 10);
      const right = parseInt(r, 10);
      sum += left * right;
    } else if (!isEnabled) {
      // Just print that it's skipped
      console.info('   SKIPPING: ', s);
    }

    return '';
  });

  const solution = 107862689;
  console.info('Summed up multiplications: ', sum, ' | Correct: ', sum === solution);
}
