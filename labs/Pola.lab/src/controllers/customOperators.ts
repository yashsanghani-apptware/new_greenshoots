
// Duration and Timestamp interfaces for custom time-related functions
interface Duration {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

interface Timestamp extends Date {}

// Custom operators and functions used in expression evaluation
// These functions add powerful capabilities like checking user roles, manipulating strings, and handling timestamps.
export const customOperators = {
  // Check if the user has an Admin role
  isAdmin: (role: string) => {
    console.log("Evaluating isAdmin with role:", role); // Added logging to track role evaluation
    return role === 'Admin';
  },
  // Check if a value is included in a list
  isIn: (value: any, list: any[]) => list.includes(value),
  // Check if a string contains a substring
  contains: (value: string, substring: string) => value.includes(substring),
  // Check if a user is older than a certain age threshold
  isOlderThan: (age: number, threshold: number) => age > threshold,
  // Check if a tag is included in the resource's tags
  hasTag: (tags: string[], tag: string) => tags.includes(tag),
  // Calculate the number of days since a specific date
  daysSince: (date: Date) => {
    const now = new Date();
    const timeDiff = now.getTime() - date.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  },
  // Add two numbers
  add: (a: number, b: number) => a + b,
  // Multiply two numbers
  multiply: (a: number, b: number) => a * b,
  // Get the length of a string
  length: (str: string) => str.length,
  // Convert a string to uppercase
  uppercase: (str: string) => str.toUpperCase(),

  // List and map functions for handling collections of data
  all: (list: any[], predicate: (item: any) => boolean) => list.every(predicate),
  exists: (list: any[], predicate: (item: any) => boolean) => list.some(predicate),
  exists_one: (list: any[], predicate: (item: any) => boolean) => list.filter(predicate).length === 1,
  filter: (list: any[], predicate: (item: any) => boolean) => list.filter(predicate),
  hasIntersection: (list1: any[], list2: any[]) => list1.some(item => list2.includes(item)),
  intersect: (list1: any[], list2: any[]) => list1.filter(item => list2.includes(item)),
  isSubset: (list1: any[], list2: any[]) => list1.every(item => list2.includes(item)),
  map: (list: any[], transform: (item: any) => any) => list.map(transform),
  size: (listOrMap: any[] | { [key: string]: any }) => Array.isArray(listOrMap) ? listOrMap.length : Object.keys(listOrMap).length,

  // String manipulation and base64 encoding/decoding functions
  base64: {
    encode: (value: string) => Buffer.from(value, 'utf-8').toString('base64'),
    decode: (value: string) => Buffer.from(value, 'base64').toString('utf-8'),
  },
  endsWith: (string: string, suffix: string) => string.endsWith(suffix),
  format: (format: string, args: any[]) => format.replace(/{(\d+)}/g, (match, number) => typeof args[number] != 'undefined' ? args[number] : match),
  indexOf: (string: string, char: string) => string.indexOf(char),
  lowerAscii: (string: string) => string.toLowerCase(),
  matches: (string: string, regex: string) => new RegExp(regex).test(string),
  replace: (string: string, oldValue: string, newValue: string, limit?: number) => {
    if (limit) {
      let count = 0;
      return string.replace(new RegExp(oldValue, 'g'), (match) => {
        count++;
        return count <= limit ? newValue : match;
      });
    } else {
      return string.replace(new RegExp(oldValue, 'g'), newValue);
    }
  },
  split: (string: string, delimiter: string, limit?: number) => string.split(delimiter, limit),
  startsWith: (string: string, prefix: string) => string.startsWith(prefix),
  substring: (string: string, start: number, end?: number) => string.substring(start, end),
  trim: (string: string) => string.trim(),
  upperAscii: (string: string) => string.toUpperCase(),

  // Duration Functions
  duration: (value: string): Duration => {
    const regex = /(\d+)([hms])/;
    const match = regex.exec(value);
    if (match) {
      const num = parseInt(match[1], 10);
      const suffix = match[2];
      switch (suffix) {
        case 'h':
          return { hours: num, minutes: 0, seconds: 0, milliseconds: 0 };
        case 'm':
          return { hours: 0, minutes: num, seconds: 0, milliseconds: 0 };
        case 's':
          return { hours: 0, minutes: 0, seconds: num, milliseconds: 0 };
        default:
          throw new Error('Invalid duration format');
      }
    }
    throw new Error('Invalid duration format');
  },
  getHours: (duration: Duration): number => duration.hours,
  getMinutes: (duration: Duration): number => duration.minutes,
  getSeconds: (duration: Duration): number => duration.seconds,
  getMilliseconds: (duration: Duration): number => duration.milliseconds,

  // Timestamp Functions
  timestamp: (value: string): Timestamp => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid timestamp format: ${value}`);
    }
    return date as Timestamp;
  },
  getFullYear: (timestamp: Timestamp): number => timestamp.getFullYear(),
  getMonth: (timestamp: Timestamp): number => timestamp.getMonth(),
  getDate: (timestamp: Timestamp): number => timestamp.getDate(),
  getDayOfWeek: (timestamp: Timestamp): number => timestamp.getDay(),
  getHoursTimestamp: (timestamp: Timestamp): number => timestamp.getHours(),
  now: (): Timestamp => new Date() as Timestamp,
  timeSince: (timestamp: Timestamp): Duration => {
    if (!timestamp || typeof timestamp.getTime !== 'function') {
      console.error("Invalid timestamp provided:", timestamp);
      throw new Error('Invalid timestamp provided.');
    }
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      milliseconds: diff % 1000,
    };
  }
};


