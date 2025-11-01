import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({
	points: 10,
	duration: 2,
});

export function rateLimiter(req, res, next) {
	limiter
		.consume(req.ip)
		.then(() => next())
		.catch(() => res.status(429).send('Too Many Requests'));
}
