/**
 * Option object to control this package
 */
interface Options {
  /**
   * Bool determine to keep the keys missing from the input but present in the map but only with values of null
   */
  keepKeys?: boolean,
}
export default function(input: object, map: object, options?: Options): object
