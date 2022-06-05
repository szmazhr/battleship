import createShip from '../ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = createShip(2);
  });

  test('should be able to be created', () => {
    expect(ship).toBeDefined();
  });

  test('should have a length', () => {
    expect(ship.length).toEqual(2);
  });

  test('should have hits', () => {
    expect(ship.hits).toEqual([]);
  });

  test('should be able to be hit', () => {
    ship.hit(1);
    expect(ship.hits).toEqual([1]);
  });

  test('should not be sunk', () => {
    ship.hit(1);
    expect(ship.isSunk()).toEqual(false);
  });

  test('should be able to be sunk', () => {
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toEqual(true);
  });
});
