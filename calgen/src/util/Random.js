export function integer(min, max) {
  return parseInt(min + Math.floor(Math.random() * (max - min)))
}

export function select(arr) {
  return arr[integer(0, arr.length)]
}

export function selectAndRemove(arr) {
  let idx = integer(0, arr.length)
  return {selected : arr[idx], rest: arr.slice(0, idx).concat(arr.slice(idx + 1, arr.length))}
}