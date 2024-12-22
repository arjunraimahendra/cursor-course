export const generateRandomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const maskApiKey = (key, isVisible) => {
  if (isVisible) {
    return key;
  }
  const parts = key.split('-');
  return `${parts[0]}-${parts[1]}-${'*'.repeat(parts[2].length)}`;
};

export const generateApiKey = (keyName) => {
  return 'tvly-' + (keyName.toLowerCase().includes('test') ? 'test-' : 'live-') + 
         generateRandomString(20);
}; 