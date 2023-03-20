import { Transform } from 'class-transformer';

export function ToNumbers() {
  return Transform(({ value }) => {
    if (typeof value == 'string') {
      value = value.split(',').map(Number);
    }
    return value && value.map(Number);
  });
}

export function ToNumber() {
  return Transform(({ value }) => value && +value);
}

export function Trim() {
  return Transform(({ value }) => value && value.trim());
}
