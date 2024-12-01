import type { Equal, Expect } from 'type-testing';

/**
 * @see https://www.adventofts.com/events/2023/4
 */
namespace AdventOfTypescript_2023_04 {
  type Address = { address: string; city: string };
  type PresentDeliveryList<T extends object> = {
    [K in keyof T]: Address;
  };

  /* ################################################
   *
   * The following lines are used to test the solution
   *
   * ################################################ */

  type MixedBehaviorList = {
    john: { behavior: 'good' };
    jimmy: { behavior: 'bad' };
    sara: { behavior: 'good' };
    suzy: { behavior: 'good' };
    chris: { behavior: 'good' };
    penny: { behavior: 'bad' };
  };
  type test_MixedBehaviorTest_actual = PresentDeliveryList<MixedBehaviorList>;
  //   ^?
  type test_MixedBehaviorTest_expected = {
    john: Address;
    jimmy: Address;
    sara: Address;
    suzy: Address;
    chris: Address;
    penny: Address;
  };
  type test_MixedBehaviorTest = Expect<Equal<test_MixedBehaviorTest_actual, test_MixedBehaviorTest_expected>>;

  type Unrelated = {
    hello: { hello: 'hello' };
    world: { world: 'world' };
  };
  type test_Unrelated_actual = PresentDeliveryList<Unrelated>;
  //   ^?
  type test_Unrelated_expected = {
    hello: Address;
    world: Address;
  };
  type test_Unrelated = Expect<Equal<test_Unrelated_actual, test_Unrelated_expected>>;
}
