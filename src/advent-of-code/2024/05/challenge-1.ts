import * as fs from 'fs';

type RuleSet = Map<
  number,
  {
    /**
     * every entry in the before set has to come **before** the key value
     */
    before: Set<number>;
    /**
     * every entry in the after set has to come **after** the key value
     */
    after: Set<number>;
  }
>;

export async function challenge01(): Promise<void> {
  const ruleset: RuleSet = new Map();
  const updates: Array<Array<number>> = [];

  fs.readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .trim()
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((line) => {
      if (line.includes('|')) {
        // Save the ruleset
        const [, value, after] = /(\d+)\|(\d+)/.exec(line)!;
        const numValue = parseInt(value, 10);
        const numAfter = parseInt(after, 10);

        if (!ruleset.has(numValue)) ruleset.set(numValue, { before: new Set(), after: new Set() });
        if (!ruleset.has(numAfter)) ruleset.set(numAfter, { before: new Set(), after: new Set() });

        ruleset.get(numValue)!.after.add(numAfter);
        ruleset.get(numAfter)!.before.add(numValue);
      } else if (/(\d+,?)+/.test(line)) {
        // Save the updates
        const numbers = line.split(',').map((n) => parseInt(n, 10));
        updates.push(numbers);
      }
    });

  /**
   * Checks if the given number is valid by checking the "before" and "after" numbers against the ruleset
   */
  const isNumberValid = (num: number, before: Array<number>, after: Array<number>): boolean => {
    if (after.length === 0) return true;

    const isBeforeValid = before.every((b) => !ruleset.has(num) || ruleset.get(num)?.before.has(b));
    const isAfterValid = after.every((a) => !ruleset.has(num) || ruleset.get(num)?.after.has(a));
    return isBeforeValid && isAfterValid;
  };

  let sum = 0;
  // iterate over every update and check if its valid
  for (const update of updates) {
    let isValid = true;

    // Check if every number of an update is valid
    for (let i = 0; i < update.length; i++) {
      const num = update[i];
      const before = update.slice(0, i);
      const after = update.slice(i + 1);
      isValid = isNumberValid(num, before, after);
      if (!isValid) break;
    }

    // If it's valid, add it's middle number to the total sum
    if (isValid) {
      const middleNumber = update[Math.floor(update.length / 2)];
      sum += middleNumber;
    }
  }

  const solution = 4790;
  console.info('Middle number sum: ', sum, ' | Correct: ', sum === solution);
}
