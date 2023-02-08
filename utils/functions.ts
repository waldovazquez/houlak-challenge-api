import crypto from 'crypto';

export const generateRandomString = (length: number): string => {
  const text = crypto.randomBytes(length).toString('hex');
  return text;
};

