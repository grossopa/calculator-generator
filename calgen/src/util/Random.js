export function integer(min, max) {
    return parseInt(min + Math.floor(Math.random() * (max - min)))
}

export function select(arr) {
    return arr[integer(0, arr.length)]
}