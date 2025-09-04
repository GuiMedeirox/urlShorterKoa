import urlRepository from '../repositories/urlRepository.js';
import { generateRandomShortCode } from '../utils/generateRandomShortCode.js';

const urlService: any = {
    shortenUrl: async (url: string) => {
        const shortCode = generateRandomShortCode(6);
        await urlRepository.shortenUrl(url, shortCode);
        return shortCode;
    },

    getOriginalUrl: async (shortCode: string) => {
        const url = await urlRepository.getOriginalUrl(shortCode);
        if (!url) {
            return null;
        }
        return url;
    }
}

export default urlService;