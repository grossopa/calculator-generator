export function integer(min, max) {
  return parseInt(min + Math.floor(Math.random() * (max - min)))
}


export function gracefulDivider(min = 0, max = GRACEFUL_DIVIDER.length, limitRange = true) {
  if (limitRange) {
    min = Math.min(min, GRACEFUL_DIVIDER.length - 1)
    max = Math.min(max, GRACEFUL_DIVIDER.length - 1)
  }
  if (Math.max(min, max) >= GRACEFUL_DIVIDER.length) {
    throw new Error("Out of range " + GRACEFUL_DIVIDER.length + ": min : " + min + " max: " + max)
  }

  // brute force, no SGD please..
  let weightMin = GRACEFUL_DIVIDER_PERCENTAGE[min]
  let weightMax = GRACEFUL_DIVIDER_PERCENTAGE[max]
  let random = integer(weightMin, weightMax + 1)
  for (var i = min; i <= max; i++) {
    if (random < GRACEFUL_DIVIDER_PERCENTAGE[i]) {
      return i;
    }
  }
  return max;
}

export function select(arr) {
  return arr[integer(0, arr.length)]
}

export function selectAndRemove(arr) {
  let idx = integer(0, arr.length)
  return {selected : arr[idx], rest: arr.slice(0, idx).concat(arr.slice(idx + 1, arr.length))}
}

let GRACEFUL_DIVIDER = [0, 
   1, 90, 70, 80, 70, 80, 70, 60, 70, 25,
  35, 45, 40, 35, 45, 55, 20, 45, 15, 25,
  10, 10, 10, 15, 25, 10, 10, 15, 10, 20]

let GRACEFUL_DIVIDER_PERCENTAGE = []
function refreshPercentage() {
  GRACEFUL_DIVIDER_PERCENTAGE = []

  var total = 0;
  for (var i = 0; i < GRACEFUL_DIVIDER.length; i++) {
    GRACEFUL_DIVIDER_PERCENTAGE[i] = GRACEFUL_DIVIDER[i] + total;
    total += GRACEFUL_DIVIDER[i]
  }
}

refreshPercentage()
