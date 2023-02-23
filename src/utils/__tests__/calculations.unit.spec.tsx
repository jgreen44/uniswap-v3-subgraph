import { calculateTime, formatCurrency, getTimeFromSeconds } from '../calculations.utils';

describe('formatCurrency', () => {
  it('should format a number in USD currency', () => {
    expect(formatCurrency(1000)).toBe('$10.00');
    expect(formatCurrency(500)).toBe('$5.00');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(-1000)).toBe('-$10.00');
  });
});

describe('calculateTime', () => {
  it('should calculate time ago from a Unix timestamp', () => {
    // Assuming the current time is 2023-02-22T00:00:00.000Z
    const timestamp = 1645200000; // 2022-02-19T00:00:00.000Z
    expect(calculateTime(timestamp)).toBe('52 weeks ago');
  });

  it('should return the time in the appropriate unit', () => {
    expect(getTimeFromSeconds(0)).toBe('0 seconds ago');
    expect(getTimeFromSeconds(10)).toBe('10 seconds ago');
    expect(getTimeFromSeconds(59)).toBe('59 seconds ago');
    expect(getTimeFromSeconds(60)).toBe('1 minute ago');
    expect(getTimeFromSeconds(61)).toBe('1 minute ago');
    expect(getTimeFromSeconds(119)).toBe('1 minute ago');
    expect(getTimeFromSeconds(120)).toBe('2 minutes ago');
    expect(getTimeFromSeconds(3599)).toBe('59 minutes ago');
    expect(getTimeFromSeconds(3600)).toBe('1 hour ago');
    expect(getTimeFromSeconds(3601)).toBe('1 hour ago');
    expect(getTimeFromSeconds(86399)).toBe('23 hours ago');
    expect(getTimeFromSeconds(86400)).toBe('1 day ago');
    expect(getTimeFromSeconds(86401)).toBe('1 day ago');
    expect(getTimeFromSeconds(172799)).toBe('1 day ago');
    expect(getTimeFromSeconds(172800)).toBe('2 days ago');
  });
});
