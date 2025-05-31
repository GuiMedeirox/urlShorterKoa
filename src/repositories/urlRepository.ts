import { PrismaClient } from '@prisma/client';
import { generateRandomShortCode } from '../utils/generateRandomShortCode.js';
const prisma = new PrismaClient();


const urlRepository: any = {
    shortenUrl: async (url: string) => {
        const shortCode = generateRandomShortCode(6);
        await prisma.shortURL.create({
        data: {
            originalUrl: url,
            shortCode,
        },
      });
      return shortCode;
    } 
}

export default urlRepository;
