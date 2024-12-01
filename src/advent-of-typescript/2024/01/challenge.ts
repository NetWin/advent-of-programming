import type { Equal, Expect } from 'type-testing';

/**
 * @see https://www.adventofts.com/events/2024/1
 */
namespace AdventOfTypescript_2024_01 {
  type Demand = number;

  /* ################################################
   *
   * The following lines are used to test the solution
   *
   * ################################################ */

  /** `Demand` corresponds to the type you supply/modify */
  type t0_actual = Demand; // =>

  /** This line shows what the expected result of `Demand` should be */
  type t0_expected = number; // =>

  /**
   * We compare the two results here with `Expect` and `Equal`
   *
   * These are special TypeScript types that will cause a type error if the two types are not equal.
   *
   * If every `Expect`/`Equal` line passes, then it means you've completed today's challenge!
   */
  export type t0 = Expect<Equal<t0_actual, t0_expected>>;
}
