import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
    points: 5,
    duration: 60
});

const rateLimitMiddleware = async (req: any, res: any, next: any) => {
    try {
        await rateLimiter.consume(req.ip);

        next();
    } catch (err) {
        res.status(429).json({ error: 'Too many requests.' });
    }
}

export default rateLimitMiddleware;