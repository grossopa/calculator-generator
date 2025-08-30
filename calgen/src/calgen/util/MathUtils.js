export function factorize(num) {
  let factors = [];
  for (let i = 2; i <= Math.sqrt(num); i++) {
    while (num % i === 0) {
      factors.push(i);
      num /= i;
    }
  }

  if (num > 1) {
    factors.push(num);
  }

  return factors;
}

export function getLength(number) {
  return Math.max(Math.floor(Math.log10(Math.abs(number))), 0) + 1;
};