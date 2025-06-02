import koaRouter, { url } from 'koa-router';
import { generateRandomShortCode } from '../utils/generateRandomShortCode.js';
import urlService from '../services/urlService.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
const router = new koaRouter();

router.use(rateLimiter(10, 1));
router.post('/', async (ctx: any) => {
  const {originalUrl} = ctx.request.body;

  const shortCode = await urlService.shortenUrl(originalUrl);
  ctx.body = {
    "shortCode": shortCode,
  }
})

router.get('/:shortCode', async (ctx: any) => {
  const { shortCode } = ctx.params;
  const originalUrl = await urlService.getOriginalUrl(shortCode);

  if (!originalUrl) {
    ctx.status = 404;
    ctx.body = {
      "message": "URL not found",
    }
    return;
  }
  
  ctx.status = 302;
  ctx.redirect(originalUrl);

})

export default router;