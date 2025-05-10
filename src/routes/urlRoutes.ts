import Router from 'koa-router';
import { getUrl, shortenUrl } from '../controllers/urlController';

const router = new Router();

router.post('/shorten', shortenUrl);
router.get('/:shortCode', getUrl);

export default router;