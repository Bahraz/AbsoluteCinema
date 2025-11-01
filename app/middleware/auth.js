export function requireAuth(req, res, next) {
	if (!req.session.user) {
		res.redirect('/');
	}
	next();
}
