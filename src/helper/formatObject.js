import { deepCopy } from './formatArray';

export function removeUndefinedKeys(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'undefined') {
      delete obj[key];
    }
  });
  return obj;
}

export function getValue(input, key = 'value') {
  if (
    typeof input === 'string' ||
    typeof input === 'boolean' ||
    typeof input === 'number'
  ) {
    return input;
  } else if (typeof input === 'object' && input !== null && key in input) {
    return input[key];
  } else {
    return undefined;
  }
}

export function removeKeysWithValues(obj, values) {
  Object.keys(obj).forEach((key) => {
    if (values.includes(obj[key])) {
      delete obj[key];
    }
  });
  return obj;
}

export function convertJsonStringToObject(objA) {
  const obj = deepCopy(objA);
  // Check if obj is a string and if it's a valid JSON string
  if (typeof obj === 'string') {
    try {
      obj = JSON.parse(obj);
    } catch (e) {
      // obj = {};
      // console.error(e);
      // Do nothing if obj is not a valid JSON string
    }
  } else if (typeof obj === 'object') {
    // Loop through all properties of the object
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // Recursively call the function on nested objects
        obj[prop] = convertJsonStringToObject(obj[prop]);
      }
    }
  }
  return obj;
}

export function extractId(obj) {
  if (typeof obj === 'string') {
    return obj;
  } else {
    return obj?.id || obj?._id || undefined;
  }
}
