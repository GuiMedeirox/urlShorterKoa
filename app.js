import koa from 'koa';

const app = new koa();

app.use(async (ctx) => {
  ctx.body = 'hiterlan, você estava certo';
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
