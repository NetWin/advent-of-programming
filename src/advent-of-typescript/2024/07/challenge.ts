import type { Equal, Expect } from 'type-testing';

/**
 * @see https://www.adventofts.com/events/2024/7
 */
namespace AdventOfTypescript_2024_07 {
  const createRoute = <const Route extends Array<string>>(
    author: string,
    route: Route
  ): { author: string; route: Route; createdAt: number } => ({
    author,
    route,
    createdAt: Date.now()
  });

  /* ################################################
   *
   * The following lines are used to test the solution
   *
   * ################################################ */

  const oneMill = createRoute('💨Dasher', ['Atherton', "Scarsdale", "Cherry Hills Village"]).route;
  type t0_actual = typeof oneMill; // =>
  type t0_expected = [           // =>
      'Atherton',
      "Scarsdale",
      "Cherry Hills Village"
  ];
  type t0 = Expect<Equal<t0_actual, t0_expected>>;

  const two = createRoute('🌟Vixen', ['Detroit', "Cleveland", "Dayton"]).route;
  type t1_actual = typeof two; // =>
  type t1_expected = [       // =>
      'Detroit',
      "Cleveland",
      "Dayton"
  ];
  type t1 = Expect<Equal<t1_actual, t1_expected>>;
}
