import { Context } from "koa";
import { createShortUrl, getOriginalUrl } from "../services/urlService";

export const shortenUrl = async (ctx: Context) => {
    const { originalUrl } = ctx.request.body;

    if (!originalUrl) {
        ctx.status = 400;
        ctx.body = { error: "Original URL is required" };
        return;
    }
    
    const shortUrl = await createShortUrl(originalUrl);
    ctx.status = 201;
    ctx.body = { shortUrl };

}


export const getUrl = async (ctx: Context) => {
    const { shortCode } = ctx.params;

    if (!shortCode) {
        ctx.status = 400;
        ctx.body = { error: "Short code is required" };
        return;
    }

    const originalUrl = await getOriginalUrl(shortCode);
    if (!originalUrl) {
        ctx.status = 404;
        ctx.body = { error: "URL not found" };
        return;
    }
    ctx.status = 302;
    ctx.body = { originalUrl };
    //we can use ctx.redirect too


}
