import { describe, it, expect } from 'vitest';
import { timeStringToMinutes } from './timeStringToMinutes';

describe('timeStringToMinutes', () => {
  it('converts "00:00" to 0', () => {
    expect(timeStringToMinutes('00:00')).toBe(0);
  });

  it('converts "12:15" to 735', () => {
    expect(timeStringToMinutes('12:15')).toBe(735);
  });

  it('converts "23:59" to 1439', () => {
    expect(timeStringToMinutes('23:59')).toBe(1439);
  });
});