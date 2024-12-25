export const parseCookie = (cookie: string): Record<string, string> => {
  return cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    return { ...acc, [key.trim()]: value };
  }, {});
};
