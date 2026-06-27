import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from './arithmetic';

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should add two negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  it('should add a positive and a negative number', () => {
    expect(add(-1, 2)).toBe(1);
  });

  it('should add two floating-point numbers', () => {
    expect(add(1.2, 2.3)).toBe(3.5);
  });

  it('should handle string inputs', () => {
    expect(add('1', '2')).toBe(3);
  });

  it('should handle a mix of string and number inputs', () => {
    expect(add('1', 2)).toBe(3);
  });

  it('should return NaN if one of the inputs is not a number', () => {
    expect(add('a', 2)).toBeNaN();
  });
});

describe('subtract', () => {
  it('should subtract two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it('should return a negative number if the second number is larger', () => {
    expect(subtract(3, 5)).toBe(-2);
  });

  it('should subtract two floating-point numbers', () => {
    expect(subtract(3.5, 1.2)).toBe(2.3);
  });

  it('should throw an error if one of the inputs is not a number', () => {
    expect(() => subtract('a', 2)).toThrow();
  });
});

describe('multiply', () => {
  it('should multiply two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it('should multiply by zero', () => {
    expect(multiply(5, 0)).toBe(0);
  });

  it('should multiply by one', () => {
    expect(multiply(5, 1)).toBe(5);
  });

  it('should multiply two negative numbers', () => {
    expect(multiply(-2, -3)).toBe(6);
  });

  it('should multiply a positive and a negative number', () => {
    expect(multiply(-2, 3)).toBe(-6);
  });

  it('should multiply two floating-point numbers', () => {
    expect(multiply(1.5, 2.5)).toBe(3.75);
  });
});

describe('divide', () => {
  it('should divide two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('should return Infinity when dividing by zero', () => {
    expect(divide(5, 0)).toBe(Infinity);
  });
});
