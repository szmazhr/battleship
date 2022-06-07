function random(max = Number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function important(callback) {
  let result = callback();
  while (!result) {
    result = callback();
  }
}

export { random, important };
