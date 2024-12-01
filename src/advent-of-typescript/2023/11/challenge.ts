import type { Equal, Expect } from 'type-testing';
import type { Prettify } from '../../../utils';
/**
 * @see https://www.adventofts.com/events/2023/11
 */
namespace AdventOfTypescript_2023_011 {
  type SantaListProtector<TObj extends object> = Prettify<{
    readonly [K in keyof TObj]: TObj[K] extends Function ? TObj[K]
    : TObj[K] extends object ? SantaListProtector<TObj[K]>
    : TObj[K] extends [infer TArray] ? readonly [TArray]
    : TObj[K];
  }>;

  /* ################################################
   *
   * The following lines are used to test the solution
   *
   * ################################################ */

  type test_0_actual = SantaListProtector<{
    //   ^?
    hacksore: () => 'naughty';
    trash: string;
    elliot: {
      penny: boolean;
      candace: {
        address: {
          street: {
            name: 'candy cane way';
            num: number;
          };
          k: 'hello';
        };
        children: [
          'harry',
          {
            saying: ['hey'];
          }
        ];
      };
    };
  }>;
  type test_0_expected = {
    readonly hacksore: () => 'naughty';
    readonly trash: string;
    readonly elliot: {
      readonly penny: boolean;
      readonly candace: {
        readonly address: {
          readonly street: {
            readonly name: 'candy cane way';
            readonly num: number;
          };
          readonly k: 'hello';
        };
        readonly children: readonly [
          'harry',
          {
            readonly saying: readonly ['hey'];
          }
        ];
      };
    };
  };
  type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

  type test_1_actual = SantaListProtector<{
    //   ^?
    theo: () => 'naughty';
    prime: string;
    netflix: {
      isChill: boolean;
    };
  }>;
  type test_1_expected = {
    readonly theo: () => 'naughty';
    readonly prime: string;
    readonly netflix: {
      readonly isChill: boolean;
    };
  };
  type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;
}
