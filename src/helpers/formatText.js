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

export function formatKobo(number) {
  return (
    typeof number == 'string' ? parseInt(number) / 100 : number / 100
  )?.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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

export const getInitials = (userObject = {}) => {
  if (!userObject?.first_name || !userObject?.last_name) {
    return '';
  }
  const { first_name, last_name } = userObject;
  const firstNameInitial = first_name?.charAt(0)?.toUpperCase();
  const lastNameInitial = last_name?.charAt(0)?.toUpperCase();
  return `${firstNameInitial}${lastNameInitial}`;
};
