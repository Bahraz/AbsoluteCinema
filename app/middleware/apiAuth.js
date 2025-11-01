import { Users } from '../db/models/users.js';

export async function requireAuthApi(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: 'Brak tokenu autoryzacyjnego' });
	}

	const token = req.headers.authorization.split(' ')[1]?.trim();

	if (!token) {
		return res.status(401).json({ message: 'Nieprawidłowy format tokenu' });
	}

	const user = await Users.findOne({ apiToken: token });

	if (!user) {
		return res
			.status(403)
			.json({ message: 'Dostęp zabroniony - nieprawidłowy token' });
	}

	next();
}
