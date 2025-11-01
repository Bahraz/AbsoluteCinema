import { Users } from '../db/models/users.js';

export class UserController {
	async showUsers(req, res) {
		const users = await Users.find({}, 'name');
		try {
			res.json(users);
		} catch (error) {
			res.status(500).json({ error: err.message });
		}
	}
	async register(req, res) {
		const user = new Users({
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			//company: req.session.company._id     <= to do łączenia IDków z np. company, dalszą czesc masz w models/user.js
		});

		try {
			await user.save();
			res.status(201).json(user);
		} catch (e) {
			res.status(422).json({ errors: e.errors });
		}
	}
	async login(req, res) {
		const emailUser = req.body.email;
		const passwordUser = req.body.password;

		try {
			const user = await Users.findOne({ email: emailUser });
			if (!user) {
				throw new Error('NIE MA TAKIEGO UZYTKOWNIKA');
			}
			const isValidUser = user.comparePassword(passwordUser);
			if (!isValidUser) {
				throw new Error('Złe hasło');
			}

			res.status(200).json({ apiToken: user.apiToken });
			// req.session.user = {
			// 	_id: user._id,
			// 	email: user.email,
			// };
			// return res.redirect('/');
		} catch (error) {
			res.sendStatus(401);
		}
	}

	logout(req, res) {
		req.session.destroy();
		return res.redirect('/');
	}

	async delete(req, res) {
		const { name } = req.params;
		try {
			await Users.deleteOne({ name });
			res.sendStatus(204);
			// res.status(204).send(); -- jesli jakies dane zwrocic to musi byc ten zapis
		} catch (error) {}
	}

	async edit(req, res) {
		const editPassword = req.body.password;
		const editEmail = req.body.email;
		// const {email} = req.params; --/jesli parametr + w api.js też
		const user = await Users.findById(req.session.user._id);
		// const user = await Users.findOne(email); --/jesli parametr
		user.email = editEmail;

		if (editPassword) {
			user.password = editPassword;
		}

		try {
			await user.save();
			req.session.user.email = user.email;
			console.log('zmienia...');
			return res.redirect('/');
		} catch (e) {
			console.log(e.errors);
		}
	}
}
