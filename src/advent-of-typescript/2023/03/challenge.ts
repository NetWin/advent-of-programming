import type { Equal, Expect } from 'type-testing';

/**
 * @see https://www.adventofts.com/events/2023/3
 */
namespace AdventOfTypescript_2023_03 {
  type GiftWrapper<TPresent, TFrom, TTo> = {
    present: TPresent;
    from: TFrom;
    to: TTo;
  };

  /* ################################################
   *
   * The following lines are used to test the solution
   *
   * ################################################ */

  type test_SantaToTrash_actual = GiftWrapper<'Car', 'Santa', 'Trash'>;
  //   ^?
  type test_SantaToTrash_expected = { present: 'Car'; from: 'Santa'; to: 'Trash' };
  type test_SantaToTrash = Expect<Equal<test_SantaToTrash_actual, test_SantaToTrash_expected>>;

  type test_TrashToPrime_actual = GiftWrapper<'vscode', 'Trash', 'Prime'>;
  //   ^?
  type test_TrashToPrime_expected = { present: 'vscode'; from: 'Trash'; to: 'Prime' };
  type test_TrashToPrime = Expect<Equal<test_TrashToPrime_actual, test_TrashToPrime_expected>>;

  type test_DanToEvan_actual = GiftWrapper<'javascript', 'Dan', 'Evan'>;
  //   ^?
  type test_DanToEvan_expected = { present: 'javascript'; from: 'Dan'; to: 'Evan' };
  type test_DanToEvan = Expect<Equal<test_DanToEvan_actual, test_DanToEvan_expected>>;
}
