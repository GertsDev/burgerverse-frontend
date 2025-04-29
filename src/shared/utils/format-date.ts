export const formatDate = (dateInput: string | Date): string => {
  // Ensure we have a Date object
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  // Compute difference in days (midnight to midnight)
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const midnightNow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const midnightThen = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const dayDiff = Math.round(
    (midnightNow.getTime() - midnightThen.getTime()) / msPerDay
  );

  // Determine the day label
  let label: string;
  if (dayDiff === 0) {
    label = 'Today';
  } else if (dayDiff === 1) {
    label = 'Yesterday';
  } else {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    label = rtf.format(-dayDiff, 'day');
  }

  // Format the time as h:mm AM/PM (12h)
  const timeFormatter = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const timePart = timeFormatter.format(date);

  return `${label}, ${timePart}`;
};
