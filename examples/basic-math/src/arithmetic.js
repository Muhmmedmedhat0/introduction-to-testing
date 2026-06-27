export const add = (a, b) => {
  if (typeof a === 'string' || typeof b === 'string') {
    a = parseFloat(a);
    b = parseFloat(b);
  }
  return a + b;
};

export const subtract = (a, b) => {
  if (typeof a === 'string' || typeof b === 'string') {
    a = parseFloat(a);
    b = parseFloat(b);
  }
  if (isNaN(a) || isNaN(b))
    throw new Error('Invalid input: both arguments must be numbers');
  return a - b;
};

export const multiply = (a, b) => {
  if (typeof a === 'string' || typeof b === 'string') {
    a = parseFloat(a);
    b = parseFloat(b);
  }
  if (isNaN(a) || isNaN(b))
    throw new Error('Invalid input: both arguments must be numbers');
  return a * b;
};

export const divide = (a, b) => {
  if (typeof a === 'string' || typeof b === 'string') {
    a = parseFloat(a);
    b = parseFloat(b);
  }
  if (isNaN(a) || isNaN(b))
    throw new Error('Invalid input: both arguments must be numbers');
  return a / b;
};
