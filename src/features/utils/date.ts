export const getStartOfMonth = (date = new Date()) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getEndOfMonth = (date = new Date()) => {
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  date.setHours(23, 59, 59, 999);
  return date;
};

export const convertToSeconds = (date?: Date | null) => {
  if (!date) {
    return 0;
  }
  return Math.ceil(date.getTime() / 1000);
};
