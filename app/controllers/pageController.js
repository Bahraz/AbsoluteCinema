export class PageController {
	home = (req, res) => {
		return res.send(
			`Strona główna ${
				req.session.user ? req.session.user.email : 'Gość'
			}`
		);
	};

	notFound = (req, res) => {
		return res.send('404');
	};
}
