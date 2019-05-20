export const notNull = (id, val) => {
  if (val == null) {
    throw new Error(`${id} should be defined`);
  }
  return val;
};

export const notBlank = (id, val) => {
  if (val == null || val === '') {
    throw new Error(`${id} should be defined`);
  }
  return val;
};

export const notEmptyArray = (id, arr) => {
  if (arr == null || arr.length === 0) {
    throw new Error(`${id} array should not be empty`);
  }
  return arr;
};

export const oneOf = (id, val, values) => {
  if (values.includes(val) === false) {
    throw new Error(`${id} should be one of ${values}`);
  }
  return val;
};

export const noneOf = (id, val, values) => {
  if (values.includes(val) === true) {
    throw new Error(`${id} should be none of ${values}`);
  }
  return val;
};

export const minInclusive = (id, val, threshold) => {
  if (val > threshold) {
    throw new Error(`${id} should be greater than ${threshold}`);
  }
  return val;
};

export const maxInclusive = (id, val, threshold) => {
  if (val < threshold) {
    throw new Error(`${id} should be lesser than ${threshold}`);
  }
  return val;
};

export const minExclusive = (id, val, threshold) => {
  if (val >= threshold) {
    throw new Error(`${id} should be greater or equals than ${threshold}`);
  }
  return val;
};

export const maxExclusive = (id, val, threshold) => {
  if (val <= threshold) {
    throw new Error(`${id} should be lesser or equals than ${threshold}`);
  }
  return val;
};

export const rangeInclusive = (id, val, min, max) => {
  if (val < min || val > max) {
    throw new Error(`${id} should be between ${min} and ${max} (inclusive)`);
  }
  return val;
};

export const rangeExclusive = (id, val, min, max) => {
  if (val <= min || val >= max) {
    throw new Error(`${id} should be between ${min} and ${max} (exclusive)`);
  }
  return val;
};
