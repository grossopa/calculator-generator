import * as Random from 'calgen/util/Random'

/**
 * where the blank position would be.
 */
class BlankPosition {
  value
  randomPosition

  constructor(value, randomPosition) {
    this.value = value
    this.randomPosition = randomPosition
  }
}

export const LEFT  = new BlankPosition(1, numsize => Random.integer(0, numsize))
export const RIGHT = new BlankPosition(2, numsize => numsize)
export const BOTH  = new BlankPosition(3, numsize => Random.integer(0, numsize + 1))
export const values = [LEFT, RIGHT, BOTH]
export const valueOf = value => values.find(item => item.value === value)