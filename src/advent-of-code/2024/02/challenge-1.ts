import * as fs from 'fs';

export async function challenge01(): Promise<void> {
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

  const isReportSafe = (levels: Array<number>): boolean => {
    // First two levels are the same and are therefore unsafe
    const isSame = levels[0] === levels[1];
    if (isSame) return false;

    // Check the direction
    const isIncreasing = levels[1]! > levels[0]!;

    let idx = 0;
    let isSafe = true;
    while (idx < levels.length - 1) {
      // Iterate through the levels and compare the current to the next level
      // If the direction stays the same we're still safe and can go on

      const next = levels[idx + 1]!;
      const current = levels[idx]!;
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
  const solution = 306;
  console.info('Number of safe reports: ', numberOfSafeReports, ' | Correct: ', numberOfSafeReports === solution);
}
