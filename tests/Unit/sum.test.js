import {
  sum,
  subtract,
  multiply,
  power,
  factorial,
} from "../../app/controllers/sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 5 - -2 to equal 7", () => {
  expect(subtract(5, -2)).toBe(7);
});

test("multiplies 2 * 3 to equal 6", () => {
  expect(multiply(2, 3)).toBe(6);
});

test("power 2 ** 3 to equal 8", () => {
  expect(power(2, 3)).toBe(8);
});

test("factorial 5 to equal 120", () => {
  expect(factorial(5)).toBe(120);
});
