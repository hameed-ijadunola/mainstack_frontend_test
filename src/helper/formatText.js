import moment from 'moment';

export function truncateText(text, maxLength) {
  if (!text) {
    return '....';
  }
  if (text?.length > maxLength) {
    return text?.slice(0, maxLength) + '...';
  } else {
    return text;
  }
}

export function convertToYesNo(value) {
  if (value === 1) {
    return 'Yes';
  } else {
    return 'No';
  }
}

export function timeFormatCheck(timeString) {
  const timeRegex = /^([0-9]{1,2}):([0-9]{2}):([0-9]{2})$/;
  return timeRegex.test(timeString);
}

export function formatKobo(number) {
  return (
    typeof number == 'string' ? parseInt(number) / 100 : number / 100
  )?.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function extractEndNumber(word) {
  const regex = /\d+$/; // Match one or more digits at the end of the string
  const match = regex.exec(word); // Try to match the regex against the input string
  if (match) {
    return parseInt(match[0]); // Return the matched number as an integer
  } else {
    return null; // If no match was found, return null
  }
}

export function formatAmount(str, type) {
  let num = parseFloat(str) * 100;
  if (type === 'number') {
    return num;
  } else return num.toString();
}

export function formatCurrency(
  number,
  dp = 2,
  currencySign = 'USD',
  removeKbZero
) {
  if (typeof number === 'string' && /^\d+$/.test(number)) {
    number = Number(number);
  }
  if (typeof number !== 'number' || isNaN(number)) {
    return '---';
  }
  let formattedNumber = Number(number).toFixed(dp);
  let parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  let formattedString = `${currencySign} ${parts.join('.')}`;

  if (removeKbZero) {
    formattedString = formattedString?.replace('.00', '');
  }

  return formattedString;
}

export const capitalize = (str, firstOnly = false) => {
  if (!str) return '----';
  else {
    if (firstOnly) {
      return str?.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
    } else
      return str
        ?.toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }
};

export const obfuscateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return ''; // Return an empty string for invalid inputs
  }

  var parts = email.split('@');

  if (parts.length !== 2) {
    return email; // Return the original email if it doesn't contain exactly one "@" symbol
  }

  var username = parts[0];
  var domain = parts[1];

  if (username.length < 5) {
    return email; // Return the original email if the username is too short
  }

  // Obtain the first letter, letter in between, and last letter
  var firstLetter = username.charAt(0) + username.charAt(1);
  var middleLetter = username.length > 2 ? username.charAt(1) : '';
  var lastLetter =
    username.charAt(username.length - 2) + username.charAt(username.length - 1);

  // Calculate the number of letters to remove
  var numLettersToRemove = username.length - 4;

  // Replace letters with asterisks
  var obfuscatedUsername =
    firstLetter + '*'.repeat(numLettersToRemove) + lastLetter;

  // Construct the obfuscated email
  var obfuscatedEmail = obfuscatedUsername + '@' + domain;

  return obfuscatedEmail;
};

export const combinePhoneNumberWithPrefix = (phoneNumber, prefix) => {
  // Remove leading zero from the phone number
  phoneNumber = phoneNumber?.replace(/^0+/, '');

  // Add a plus sign to the prefix if it doesn't have one already
  if (!prefix?.startsWith('+')) {
    prefix = '+' + prefix;
  }

  // Check if the phone number already contains the prefix
  if (phoneNumber?.startsWith(prefix)) {
    return phoneNumber;
  } else {
    return prefix + phoneNumber;
  }
};

export const errorMessageFormat = (
  res,
  defaultMessage = 'Something went wrong!'
) => {
  return (
    (res?.error?.data?.message && res?.error?.data?.message?.includes('dup key')
      ? 'This entity already exists and duplicates is not allowed'
      : res?.error?.data?.message) ||
    (typeof res?.error?.error == 'string' && res?.error?.error) ||
    (typeof res?.error?.message == 'string' && res?.error?.message) ||
    (typeof res?.error?.description == 'string' && res?.error?.description) ||
    (typeof res?.error == 'string' && res?.error) ||
    (typeof res == 'string' && res) ||
    defaultMessage
  )
    ?.replace('TypeError: ', '')
    ?.replace('Network request failed', 'Check your internet connection')
    ?.replace('Failed to fetch', 'Check your internet connection');
};

export const formatDate = (dateString) => {
  const currentDate = moment();
  const targetDate = moment(dateString);

  const diffInDays = currentDate.diff(targetDate, 'days');

  if (diffInDays === 0) {
    const diffInHours = currentDate.diff(targetDate, 'hours');
    if (diffInHours === 0) {
      const diffInMins = currentDate.diff(targetDate, 'minutes');
      if (diffInMins === 0) {
        const diffInSecs = currentDate.diff(targetDate, 'seconds');
        return `${diffInSecs} ${diffInSecs <= 1 ? 'sec' : 'secs'} ago`;
      }
      return `${diffInMins} ${diffInMins <= 1 ? 'min' : 'mins'} ago`;
    }
    return `${diffInHours} ${diffInHours <= 1 ? 'hour' : 'hours'} ago`;
  }

  if (diffInDays === 1) {
    return 'yesterday';
  }

  if (diffInDays <= 3) {
    return `${diffInDays} ${diffInDays <= 1 ? 'day' : 'days'} ago`;
  }

  const diffInYears = currentDate.diff(targetDate, 'years');

  if (diffInYears === 0) {
    return targetDate.format('DD/MM/YY');
  }
  return targetDate.format('DD/MM/YY');
};

export const highlightWords = (text, substring, activeColor, baseColor) => {
  const words = text.split(' ');

  return words.map((word, index) => (
    <span
      key={index}
      className={
        word.toLowerCase().includes(substring?.toLowerCase())
          ? activeColor
          : baseColor
      }
    >
      {word}
      {words?.length > index + 1 ? ' ' : ''}
    </span>
  ));
};
