const listeners = new Map<number, Map<number, () => Promise<void>>>();

/**
 * Registers a new Advent of Code challenge.
 */
export function onChallenge(year: number, day: number, cb: () => Promise<void>): void {
  if (!listeners.has(year)) listeners.set(year, new Map());
  listeners.get(year)!.set(day, cb);
}

/**
 * Executes the Advent of Code challenge for the given year and day.
 */
export async function executeChallenge(year: number, day: number): Promise<void> {
  return listeners.get(year)?.get(day)?.();
}
