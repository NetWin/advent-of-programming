import type { Equal, Expect } from 'type-testing';

/**
 * @see https://www.adventofts.com/events/2023/7
 */
namespace AdventOfTypescript_2023_07 {
  type AppendGood<T extends object> = {
    [K in keyof T as `good_${Extract<K, string>}`]: T[K];
  };

  /* ################################################
   *
   * The following lines are used to test the solution
   *
   * ################################################ */

  type WellBehavedList = {
    tom: { address: '1 candy cane lane' };
    timmy: { address: '43 chocolate dr' };
    trash: { address: '637 starlight way' };
    candace: { address: '12 aurora' };
  };

  type test_wellBehaved_actual = AppendGood<WellBehavedList>;
  //   ^?
  type test_wellBehaved_expected = {
    good_tom: { address: '1 candy cane lane' };
    good_timmy: { address: '43 chocolate dr' };
    good_trash: { address: '637 starlight way' };
    good_candace: { address: '12 aurora' };
  };
  type test_wellBehaved = Expect<Equal<test_wellBehaved_expected, test_wellBehaved_actual>>;

  type Unrelated = {
    dont: 'cheat';
    play: 'fair';
  };
  type test_Unrelated_actual = AppendGood<Unrelated>;
  //   ^?
  type test_Unrelated_expected = {
    good_dont: 'cheat';
    good_play: 'fair';
  };
  type test_Unrelated = Expect<Equal<test_Unrelated_expected, test_Unrelated_actual>>;
}
