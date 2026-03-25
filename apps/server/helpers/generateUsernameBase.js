const transliterate = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const generateUsernameBase = (firstName, lastName) =>
  transliterate(`${firstName}${lastName}`).toLowerCase().replace(/[^a-z0-9_]/g, "");
