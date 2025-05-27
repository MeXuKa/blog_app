import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter: RateLimiterMemory = new RateLimiterMemory({
    points: 5,
    duration: 60
});

const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await rateLimiter.consume(req.ip || 'unknown-ip');

        next();
    } catch (err) {
        next(err);
    }
}

export default rateLimitMiddleware;