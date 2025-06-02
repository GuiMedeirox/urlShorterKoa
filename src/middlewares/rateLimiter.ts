import { TokenBucket } from "../utils/tokenBucket.js";

const buckets = new Map<string, TokenBucket>();

export const rateLimiter = (capacity: number, refillRate: number) => {
    return async (ctx: any, next: any) => {
        const ip = ctx.ip;
        if (!buckets.has(ip)) {
            buckets.set(ip, new TokenBucket(capacity, refillRate));
        }
        const bucket = buckets.get(ip);
        if (!bucket?.consume()) {
            ctx.status = 429;
            ctx.body = {
                "message": "Too many requests",
            }
            return;
        }
        await next();
    }
}