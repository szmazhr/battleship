// Ship Constructor
function Ship(length) {
  this.length = length;
  this.hits = [];
}

// Hit Method
function hit(position) {
  if (this.hits.indexOf(position) === -1) {
    this.hits.push(position);
  }
}

// isSunk Method
function isSunk() {
  return this.hits.length === this.length;
}

// Assign Methods to Ship Prototype
Object.assign(Ship.prototype, { hit, isSunk });

export default Ship;
