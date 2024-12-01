import { input, select } from '@inquirer/prompts';
import { parseArgs } from 'util';
import { executeChallenge, getFolders } from './utils';

// Register all listeners
import './advent-of-code';

// Parse the command line arguments (--year, --day)
const parsedArgs = parseArgs({
  args: process.argv,
  options: {
    year: { type: 'string' },
    day: { type: 'string' }
  },
  strict: true,
  allowPositionals: true
});

const queryYear = async (): Promise<string> => {
  // Provided via command line arguments
  if (parsedArgs?.values?.year) {
    return parsedArgs.values.year;
  }

  // Let the user select the year
  const years = getFolders(`./src/advent-of-code`);
  return select({
    message: 'Which year?',
    choices: years.map((year) => ({ name: year, value: year }))
  });
};

const queryDay = async (year: string): Promise<string> => {
  // Provided via command line arguments
  if (parsedArgs?.values?.day) {
    return parsedArgs.values.day;
  }

  // Let the user select the day
  const days = getFolders(`./src/advent-of-code/${year}`);
  return select({
    message: 'Which day?',
    choices: days.map((day) => ({ name: day, value: day }))
  });
};

// Run the challenges
while (true) {
  // Ask the user for the year and day
  const year = await queryYear();
  const day = await queryDay(year);

  // Clear the year and day from the parsed arguments
  // Otherwise, the challenge will run with the same year and day every time
  parsedArgs.values.year = undefined;
  parsedArgs.values.day = undefined;

  // Clear the console and run the challenge
  console.clear();
  await executeChallenge(parseInt(year, 10), parseInt(day, 10));

  // Wait for the user to press enter before clearing the console and asking for another challenge
  await input({ message: 'Press enter to continue' });
  console.clear();
}
