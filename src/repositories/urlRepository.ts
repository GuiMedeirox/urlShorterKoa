import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const urlRepository: any = {
    shortenUrl: async (url: string, shortCode: string) => {
        await prisma.shortURL.create({
        data: {
            originalUrl: url,
            shortCode,
        },
      });
      return shortCode;
    }, 

    getOriginalUrl: async (shortCode: string) => {
        const url = await prisma.shortURL.findUnique({
            where: { shortCode },
        });
        return url?.originalUrl;
    },
    
}

export default urlRepository;
