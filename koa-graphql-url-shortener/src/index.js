import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import Router from '@koa/router';

import {typeDefs} from './schema.js';
import {resolvers} from './resolvers.js';
import { db } from './db.js';

const app = new Koa();
const router = new Router();

router.get('/:code', (ctx) => {
    const {code} = ctx.params; 
    console.log(code); 
    const response = db.prepare(`SELECT url FROM urls WHERE code = ?`).get(code); 

    if(response){
        ctx.redirect(response.url);
    } else{
        ctx.status=404; 
        ctx.body='this short url doesnt exist'; 
    }
});

app.use(router.routes()).use(router.allowedMethods());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });

router.get('/', (ctx) => {
  ctx.body = 'Welcome to the GraphQL URL Shortener API';
});

app.use(router.routes());

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
