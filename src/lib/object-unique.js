/**
 * uniqify array of object
 * @param  {Array<{id:any}>} arr1 first array
 * @param  {Array<{id:any}>} arr2 second array
 * @return {Array<{id:any}>} result
 */

export default (arr1, arr2) => {
  if (arr1 && arr2) {
    return (
      Object.values(arr1.concat(arr2).reduce((prev, elem) => {
        prev[elem.id] = elem
        return prev
      }, {}))
    )
  } else {
    return []
  }
}
