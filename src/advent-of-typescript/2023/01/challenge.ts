import type { Equal, Expect } from 'type-testing';

/**
 * @see https://www.adventofts.com/events/2023/1
 */
namespace AdventOfTypescript_2023_01 {
  type SantasFavoriteCookies = 'ginger-bread' | 'chocolate-chip';

  /* ################################################
   *
   * The following lines are used to test the solution
   *
   * ################################################ */

  type test_0_actual = SantasFavoriteCookies;
  //   ^?
  type test_0_expected = 'ginger-bread' | 'chocolate-chip';
  type test_0 = Expect<Equal<test_0_actual, test_0_expected>>;
}
