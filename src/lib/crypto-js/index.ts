import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_CRYPTO_SECRET_KEY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  try {
    return JSON.parse(decryptedData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveDataToLocalStorage = (key: string, data: any) => {
  const encrypted = encryptData(data);
  localStorage.setItem(key, encrypted);
}

export const getDataFromLocalStorage = (key: string) => {
  const encryptedData = localStorage.getItem(key);
  const localStorageData = encryptedData ? decryptData(encryptedData) : null;
  return localStorageData;
}
