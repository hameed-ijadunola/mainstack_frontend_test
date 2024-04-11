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

export const getIntervalTranslation = (interval) => {
  switch (isSubstringInArray(interval, ['last'])) {
    case true:
      return `the ${interval?.toLowerCase() || ''}`;

    case false:
      return `${interval?.toLowerCase() || ''}`;

    default:
      return '';
  }
};

export const isDateWithinRange = (
  dateString,
  startDateString,
  endDateString
) => {
  const date = new Date(dateString);
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Check if the date is within the range (inclusive)
  return date >= startDate && date <= endDate;
};

export const isArrayNonEmpty = (value) => {
  return Array.isArray(value) && value?.length > 0;
};

export const findOldestAndNewestDates = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length === 0) {
    return [null, null]; // Return [null, null] if the input is invalid or empty
  }

  const formattedDates = dateArray.map((dateStr) => new Date(dateStr));
  const oldestDate = new Date(Math.min(...formattedDates));
  const newestDate = new Date(Math.max(...formattedDates));

  return { startDate: oldestDate, endDate: newestDate };
};

export const removeDuplicates = (
  arr,
  preserveOrder = true,
  removeEmptyString = false
) => {
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
};

export const sortByDate = (arr, asc) => {
  const validObjects = arr.filter((obj) => obj.date);
  validObjects.sort((a, b) =>
    asc
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );

  const sortedArray = validObjects.concat(arr.filter((obj) => !obj.date));
  return sortedArray;
};
