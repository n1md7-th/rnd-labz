export function isString(value) {
  return typeof value === 'string';
}

export function isNumber(value) {
  return typeof value === 'number';
}

export function isBoolean(value) {
  return typeof value === 'boolean';
}

export function isPrimitive(value) {
  return isString(value) || isNumber(value) || isBoolean(value);
}
