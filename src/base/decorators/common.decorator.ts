import { Transform } from 'class-transformer';

export function ToNumbers() {
  return Transform(({ value }) => value && value.map(Number));
}

export function ToNumber() {
  return Transform(({ value }) => value && +value);
}

export function Trim() {
  return Transform(({ value }) => value && value.trim());
}
