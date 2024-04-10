import { extractId } from './formatObject';

export function getRandomElementFromArray(arr) {
  if (arr.length > 0) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  return;
}

export function toggleArrayElement(array, element) {
  const index = array.indexOf(element);
  if (index === -1) {
    // Element doesn't exist in array, so add it
    array.push(element);
  } else {
    // Element exists in array, so remove it
    array.splice(index, 1);
  }
  return array;
}

export const flattenedArray = (originalArray) => {
  return originalArray.reduce((acc, innerArray) => {
    return [...acc, ...innerArray];
  }, []);
};

export function getPropertyArray(array, property) {
  return array.map(function (obj) {
    return obj[property];
  });
}

export function isSubstringInArray(substring, stringArray) {
  const upperCaseSubstring = substring?.toUpperCase();
  for (let i = 0; i < stringArray?.length; i++) {
    const upperCaseString = stringArray[i]?.toUpperCase();
    if (
      upperCaseString?.includes(upperCaseSubstring) ||
      upperCaseSubstring?.includes(upperCaseString)
    ) {
      return true;
    }
  }
  return false;
}

export function isSubstringInArrayStrict(substring, stringArray) {
  const upperCaseSubstring = substring?.toUpperCase();
  for (let i = 0; i < stringArray?.length; i++) {
    const upperCaseString = stringArray[i]?.toUpperCase();
    if (upperCaseString === upperCaseSubstring) {
      return true;
    }
  }
  return false;
}

export function sortAscending(arr) {
  return [...arr]?.sort((a, b) => a?.localeCompare(b));
}

export const sortedDataByCreatedAt = (data, order = 'asc') =>
  isArrayNonEmpty(data)
    ? [...data]
        ?.filter((x) => x?.created_at || x?.createdAt)
        ?.sort((a, b) => {
          return order === 'asc'
            ? Number(new Date(a?.created_at || a?.createdAt)) -
                Number(new Date(b?.created_at || b?.createdAt))
            : Number(new Date(b?.created_at || b?.createdAt)) -
                Number(new Date(a?.created_at || a?.createdAt));
        })
    : [];

export const sortedDataByUpdatedAt = (data, order = 'desc') =>
  isArrayNonEmpty(data)
    ? [...data]?.sort((a, b) => {
        return order === 'desc'
          ? new Date(a?.updated_at || a?.updatedAt) -
              new Date(b?.updated_at || b?.updatedAt)
          : new Date(b?.updated_at || b?.updatedAt) -
              new Date(a?.updated_at || a?.updatedAt);
      })
    : [];

export function sortByProperty(array, property, order = 'asc') {
  const sortOrder = order === 'desc' ? -1 : 1;
  if (!Array.isArray(array)) {
    return [];
  } else if (array?.length == 0) {
    return array;
  } else {
    return [...array]?.sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];
      if (aValue < bValue) {
        return -1 * sortOrder;
      }
      if (aValue > bValue) {
        return 1 * sortOrder;
      }
      return 0;
    });
  }
}

export function generateNaturalNumbers(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

export function updateObjects(arr, condition, propName, propValue) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (condition(arr[i])) {
      let newObj = { ...arr[i], [propName]: propValue };
      newArr.push(newObj);
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

export function getAdjacentObject(
  array,
  currentPropValue,
  propName,
  direction
) {
  const currentIndex = array.findIndex(
    (obj) => obj[propName] === currentPropValue
  );
  const adjacentIndex =
    direction === 'next' ? currentIndex + 1 : currentIndex - 1;
  return array[adjacentIndex] || null;
}

export function isLastObjectByProperty(arr, obj, prop) {
  const lastIndex = arr.length - 1;
  const lastElement = arr[lastIndex];
  return lastElement[prop] === obj[prop];
}

export function getFilenames(fileList) {
  let filenames = [];
  for (let i = 0; i < fileList.length; i++) {
    filenames.push(fileList[i].name);
  }
  return filenames;
}

export function extractPropsByInputArray(arr, inPropArr, inProp, outProp) {
  const extProps = [];
  for (const obj of arr) {
    if (inPropArr?.includes(obj[inProp])) {
      extProps?.push(obj[outProp]);
    }
  }
  return extProps;
}

export function areFileListsEqual(fileList1, fileList2) {
  if (fileList1?.length !== fileList2?.length) {
    return false;
  }

  for (let i = 0; i < fileList1?.length; i++) {
    const file1 = fileList1?.item(i);
    let found = false;
    for (let j = 0; j < fileList2?.length; j++) {
      const file2 = fileList2?.item(j);
      if (file1?.name === file2?.name && file1?.size === file2?.size) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }

  return true;
}

export function sortByTagName(array) {
  return [...array].sort((a, b) => {
    const tagA = a?.tags[0]?.name?.toUpperCase();
    const tagB = b?.tags[0]?.name?.toUpperCase();

    if (tagA < tagB) {
      return -1;
    }
    if (tagA > tagB) {
      return 1;
    }

    return 0;
  });

  return array;
}

export function removeDuplicatesByKey(arr, key) {
  if (!arr || !Array.isArray(arr)) {
    return [];
  } else {
    return arr?.filter(
      (obj, index, self) =>
        index === self?.findIndex((o) => o[key] === obj[key])
    );
  }
}

export function removeUndefinedOrNull(arr) {
  if (!arr) return [];
  return arr?.filter(
    (item) => item !== undefined && item !== null && item !== ''
  );
}

export function extractValueFromArray(arr, key) {
  const values = [];
  for (const obj of arr) {
    if (obj[key] !== undefined) {
      values.push(obj[key]);
    } else {
      for (const [nestedKey, nestedValue] of Object.entries(obj)) {
        if (typeof nestedValue === 'object' && nestedValue !== null) {
          const nestedValues = extractValueFromArray([nestedValue], key);
          if (nestedValues.length > 0) {
            values.push(...nestedValues);
          }
        }
      }
    }
  }
  return values;
}

export function removeDuplicates(
  arr,
  preserveOrder = false,
  removeEmptyString = false
) {
  let result;

  if (preserveOrder || removeEmptyString) {
    result = [];
    for (const item of arr) {
      if (!result.includes(item) && item !== '') {
        result.push(item);
      }
    }
  } else {
    result = [...new Set(arr)];
  }

  return result;
}

export function extractObjectWithMarketId(products, uom_id, market_id) {
  let result = null;
  for (let i = 0; i < products?.length; i++) {
    let product = products[i];
    if (extractId(product?.uom_id) === uom_id) {
      if (extractId(product?.market_id) === market_id) {
        result = product;
        break;
      } else if (isSubstringInArray(product?.market_id?.name, ['Default'])) {
        result = product;
      }
    }
  }
  return result;
}

export function removeObjectFromArray(arr, key, value) {
  if (!Array.isArray(arr)) {
    throw new TypeError(`Expected an array, but got ${typeof arr}.`);
  }

  if (typeof key !== 'string') {
    throw new TypeError(`Expected a string for key, but got ${typeof key}.`);
  }

  const index = arr.findIndex((item) => item[key] === value);
  if (index !== -1) {
    const newArray = [...arr.slice(0, index), ...arr.slice(index + 1)];
    arr.length = 0;
    newArray.forEach((item) => arr.push(item));
  }
}

export function extractObjectsByPropertyValue(array, property, value) {
  if (!Array.isArray(array)) {
    console.error('Invalid input. Expected an array.');
    return array || [];
  }

  if (typeof property !== 'string') {
    console.error('Invalid input. Expected property to be a string.');
    return array || [];
  }

  return array.filter(
    (item) => item && item.hasOwnProperty(property) && item[property] === value
  );
}

export function combineArraysAndRemoveDuplicates(arrays, propertyKey) {
  if (!Array.isArray(arrays)) {
    console.error('Invalid input. Expected an array of arrays.');
    return arrays;
  }

  if (typeof propertyKey !== 'string') {
    console.error('Invalid input. Expected propertyKey to be a string.');
    return arrays;
  }

  const combinedArray = [].concat(...arrays);

  if (
    !combinedArray.every((item) => item && item.hasOwnProperty(propertyKey))
  ) {
    console.error(
      'Invalid input. Not all objects have the specified propertyKey.'
    );
    return arrays;
  }

  const uniqueArray = Array.from(
    new Set(combinedArray.map((item) => item[propertyKey]))
  ).map((key) => combinedArray.find((item) => item[propertyKey] === key));

  return uniqueArray;
}

export function sortByHighestBalance(arr) {
  arr.sort((a, b) => {
    const balanceA = a.value - a.used_value;
    const balanceB = b.value - b.used_value;

    return balanceB - balanceA;
  });

  return arr;
}

export function sortByZeroBalanceLast(arr) {
  let zeroBalanceObjects = [];
  let nonZeroBalanceObjects = [];

  arr?.forEach((item) => {
    const balance = item?.value - item?.used_value;
    if (balance === 0) {
      zeroBalanceObjects?.push(item);
    } else {
      nonZeroBalanceObjects?.push(item);
    }
  });

  return [...nonZeroBalanceObjects, ...zeroBalanceObjects];
}

export function removeStringFromArray(arr, target) {
  return arr.filter((item) => item != target);
}

export function getRandomObjectsFromArray(array, count) {
  if (count >= array.length) {
    return array; // Return all elements if count is greater than or equal to array length
  }

  const shuffledArray = array.slice(); // Create a copy of the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, count);
}

export function isArrayNonEmpty(value) {
  return Array.isArray(value) && value?.length > 0;
}

export function joinWithCommaAndAnd(arr, addAnd = true) {
  if (typeof arr === 'string') {
    return arr;
  }
  if (!Array.isArray(arr)) {
    return '';
  }
  if (arr?.length === 0) {
    return '';
  } else if (arr?.length === 1) {
    return arr[0];
  } else if (!addAnd) {
    return arr?.join(', ');
  } else if (arr?.length === 2) {
    return arr?.join(' and ');
  } else {
    const lastItem = arr?.pop();
    const joinedItems = arr?.join(', ');
    return `${joinedItems}, and ${lastItem}`;
  }
}

export function areArraysEqual(arrA, arrB, compareKeys) {
  let arr1 = [...arrA];
  let arr2 = [...arrB];
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Sort both arrays
  arr1.sort();
  arr2.sort();

  // Compare each pair of objects
  for (let i = 0; i < arr1.length; i++) {
    if ((!isObjectEqual(arr1[i], arr2[i]), compareKeys)) {
      return false;
    }
  }

  return true;
}

export function isObjectEqual(obj1, obj2, compareKeys = []) {
  if (compareKeys?.length > 0) {
    for (const key in compareKeys) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  } else {
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }
}

export function deepCopy(input) {
  if (Array.isArray(input)) {
    // If it's an array, create a copy of each element
    return input.map(deepCopy);
  } else if (typeof input === 'object' && input !== null) {
    // If it's an object, create a copy of each property
    const copy = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        copy[key] = deepCopy(input[key]);
      }
    }
    return copy;
  } else {
    // If it's neither an array nor an object, return the input as is
    return input;
  }
}

export function extractArray(arr) {
  if (Array.isArray(arr)) {
    return arr;
  } else {
    return [];
  }
}
