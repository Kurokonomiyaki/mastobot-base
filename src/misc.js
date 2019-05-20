import Url from 'url';
import Path from 'path';
import { randomInteger } from './random';

export const mergeArrays = (arr1, arr2) => {
  if (Array.isArray(arr2)) {
    return [
      ...arr1,
      ...arr2,
    ];
  }
  return arr1;
};

export const delayExecution = async (func, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(func());
    }, delay);
  });
};

export const delayExecutionRandom = async (func, minDelay = 500, maxDelay = 700) => {
  return new Promise((resolve) => {
    const time = randomInteger(minDelay, maxDelay);
    setTimeout(() => {
      resolve(func());
    }, time);
  });
};

export const makeFullyQualifiedAccount = (account) => {
  let result = account.toLowerCase().trim();
  if (result.startsWith('@') === false) {
    result = `@${result}`;
  }
  return result;
};

export const parseAccountUrl = (url) => {
  const parsedUrl = Url.parse(url);
  const { hostname, pathname } = parsedUrl;

  if (pathname != null && hostname != null) {
    const userName = Path.posix.basename(pathname);
    if (userName != null) {
      return makeFullyQualifiedAccount(`${userName}@${hostname}`);
    }
  }

  return null;
};

export const asyncMap = async (arr, f) => {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    const result = await f(arr[i], i, arr);
    results.push(result);
  }
  return results;
};
