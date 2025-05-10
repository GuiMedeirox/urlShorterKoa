import prisma from '../utils/prismaClient';
import generateRandomString from '../utils/generateCode';

export const createShortUrl = async (originalUrl: string): Promise<string> => {
  // Generate a unique short code
  let shortCode: string = '';
  let isUnique = false;

  while (!isUnique) {
    shortCode = generateRandomString(6);
    const existingUrl = await prisma.url.findUnique({
      where: { shortCode },
    });
    isUnique = !existingUrl; // Ensure the short code is unique
  }

  // Save the URL in the database
  await prisma.url.create({
    data: {
      originalUrl,
      shortCode,
    },
  });

  return shortCode;
};


 
export const getOriginalUrl = async (shortCode: string): Promise<string | null> => {
  const url = await prisma.url.findUnique({
    where: { shortCode },
  });

  return url?.originalUrl || null;
};


export const incrementClickCount = async (shortCode: string): Promise<void> => {
  await prisma.url.update({
    where: { shortCode },
    data: {
      clicks: { increment: 1 },
    },
  });
};
