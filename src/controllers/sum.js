export const sum = (a, b) => a + b;

export const subtract = (a, b) => a - b;

export const multiply = (a, b) => a * b;

export const divide = (a, b) => a / b;

export const power = (a, b) => a ** b;

export const squareRoot = (a) => Math.sqrt(a);

export const absoluteValue = (a) => Math.abs(a);

export const factorial = (a) => {
	if (a === 0) return 1;
	return a * factorial(a - 1);
};
