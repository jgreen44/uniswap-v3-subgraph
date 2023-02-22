export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const getTimeFromSeconds = (seconds: number) => {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  if (seconds < minute) {
    return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return hours + (hours === 1 ? ' hour ago' : ' hours ago');
  } else if (seconds < week) {
    const days = Math.floor(seconds / day);
    return days + (days === 1 ? ' day ago' : ' days ago');
  } else {
    const weeks = Math.floor(seconds / week);
    return weeks + (weeks === 1 ? ' week ago' : ' weeks ago');
  }
};

export const calculateTime = (time: any) => {
  const now = Date.now();
  const timestamp = time * 1000;
  const diff = now - timestamp;
  const diffSeconds = Math.floor(diff / 1000);
  return getTimeFromSeconds(diffSeconds);
};
