import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import urlController from './dist/controllers/urlController.js';

const app = new Koa();

// Middleware
app.use(bodyParser());

// Routes
app.use(urlController.routes());
app.use(urlController.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
