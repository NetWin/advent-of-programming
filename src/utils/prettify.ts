/**
 * Helper utility to make the hover overlay within VSCode more readable.
 *
 * Created by Matt Pocock. (At least i know this one from him)
 * See: https://www.totaltypescript.com/concepts/the-prettify-helper
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
