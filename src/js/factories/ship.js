function Ship(length) {
  this.length = length;
  this.hits = [];
}

function hit(position) {
  if (this.hits.indexOf(position) === -1) {
    this.hits.push(position);
  }
}

function isSunk() {
  return this.hits.length === this.length;
}

function createShip(length) {
  const newShip = new Ship(length);
  Object.assign(newShip, { hit, isSunk });
  return newShip;
}

export default createShip;
