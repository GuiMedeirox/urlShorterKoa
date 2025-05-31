import koaRouter, { url } from 'koa-router';
import { generateRandomShortCode } from '../utils/generateRandomShortCode.js';
import urlService from '../services/urlService.js';
const router = new koaRouter();

  
router.get('/', (ctx: any) => {
  ctx.body = generateRandomShortCode(6);
});

router.post('/', async (ctx: any) => {
  const {originalUrl} = ctx.request.body;

  const shortCode = await urlService.shortenUrl(originalUrl);
  ctx.body = {
    "shortCode": shortCode,
  }
})

export default router;