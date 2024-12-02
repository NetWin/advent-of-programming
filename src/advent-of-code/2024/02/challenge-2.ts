import * as fs from 'fs';

export async function challenge02(): Promise<void> {
  // Read the input file and sort it into the corresponding lists
  const reports = fs
    .readFileSync(`${__dirname}/input.txt`, 'utf-8')
    .trim()
    .split('\n')
    .map((line) =>
      line
        .trim()
        .split(/\s+/)
        .map((n) => parseInt(n.trim(), 10))
    );

  const isReportSafe = (levels: Array<number>, indexToIgnore?: number): boolean => {
    // Yes, i know it's brute force but hey, the input is not to big so better pragmatic than overly complex.
    // Just reuse the same logic from challenge one but try it for every "sub"-report (where one level is ignored).
    //
    // Important note here on why this works: A safe report is still safe when the first (or last) number is removed.
    if (indexToIgnore === undefined) {
      const isAnySafe = levels.some((_, i) => isReportSafe(levels, i));
      return isAnySafe;
    }

    // First two levels are the same and are therefore unsafe
    const newLevels = levels.filter((_, i) => i !== indexToIgnore);
    const isSame = newLevels[0] === newLevels[1];
    if (isSame) return false;

    // Check the direction
    const isIncreasing = newLevels[1]! > newLevels[0]!;

    let idx = 0;
    let isSafe = true;
    while (idx < newLevels.length - 1) {
      // Iterate through the levels and compare the current to the next level
      // If the direction stays the same we're still safe and can go on
      const next = newLevels[idx + 1]!;
      const current = newLevels[idx]!;
      const diff = isIncreasing ? next - current : current - next;

      isSafe = diff >= 1 && diff <= 3;
      idx++;

      // As soon as we are not safe anymore, immediately return
      if (!isSafe) break;
    }

    // Seems like we walked through all levels and are still safe 🚀
    return isSafe;
  };

  // Sum up the number of safe reports
  const numberOfSafeReports = reports.reduce((acc, curr) => acc + (isReportSafe(curr) ? 1 : 0), 0);

  // And print them to the console
  const solution = 366;
  console.info('Number of safe reports: ', numberOfSafeReports, ' | Correct: ', numberOfSafeReports === solution);
}
