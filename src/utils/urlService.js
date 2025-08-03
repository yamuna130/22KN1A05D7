export const shortenURL = (original, validity = 30, shortcode = null) => {
  const urls = JSON.parse(localStorage.getItem('urls')) || [];

  const code = shortcode || generateRandomCode();
  const expiryTime = Date.now() + (parseInt(validity || 30) * 60000);

  const shortURL = `http://localhost:3000/${code}`;

  const newEntry = {
    original,
    short: shortURL,
    expiry: new Date(expiryTime).toLocaleString(),
    code,
    validity: validity || 30
  };

  urls.push(newEntry);
  localStorage.setItem('urls', JSON.stringify(urls));
  return newEntry;
};

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 8);
};
