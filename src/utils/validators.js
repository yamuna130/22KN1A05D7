export const validateURL = (url) => {
  const regex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-]*)*$/;
  return regex.test(url);
};

export const validateMinutes = (value) => {
  return /^\d+$/.test(value);
};
