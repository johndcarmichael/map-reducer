/**
 * Option object to control this package
 */
interface Options {
  /**
   * Bool determine to keep the keys missing from the input but present in the map but only with values of null
   */
  keepKeys?: boolean,
  /**
   * Bool if true will throw an error when an alien attribute is found
   */
  throwErrorOnAlien?: boolean,

  /**
   * If true, will pass null or undefined through
   */
  allowNullish?: boolean
}
export default function(input: object, map: object, options?: Options): object
