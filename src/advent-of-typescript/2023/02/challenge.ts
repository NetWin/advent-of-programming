import type { Equal, Expect } from 'type-testing';

/**
 * @see https://www.adventofts.com/events/2023/2
 */
namespace AdventOfTypescript_2023_02 {
  type CookieSurveyInput<T extends object> = keyof T;

  /* ################################################
   *
   * The following lines are used to test the solution
   *
   * ################################################ */

  const cookieInventory = {
    chocolate: 1,
    sugar: 20,
    gingerBread: 10,
    peanutButter: 30,
    snickeDoodle: 73
  };
  type test_cookies_actual = CookieSurveyInput<typeof cookieInventory>;
  //   ^?
  type test_cookies_expected = 'chocolate' | 'sugar' | 'gingerBread' | 'peanutButter' | 'snickeDoodle';
  export type test_cookies = Expect<Equal<test_cookies_actual, test_cookies_expected>>;

  const unrelated = {
    hi: 1,
    hi2: 1,
    hi3: 1,
    hi4: 1,
    hi5: 1,
    hi6: 1,
    hi7: 1
  };
  type test_unrelated_actual = CookieSurveyInput<typeof unrelated>;
  //   ^?
  type test_unrealted_expected = 'hi' | 'hi2' | 'hi3' | 'hi4' | 'hi5' | 'hi6' | 'hi7';
  type test_unrelated = Expect<Equal<test_unrelated_actual, test_unrealted_expected>>;
}
