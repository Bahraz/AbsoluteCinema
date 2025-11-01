import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import randomstring from 'randomstring';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
	//JEŚLI CHCE POWIĄZAĆ Z INNĄ 'TABELKĄ DANE TO TYLKO WPISUJE NP NOWĄ DANĄ: //na dole kodu przyklad
	name: {
		type: String,
		required: [true, 'Wymagane'],
		unique: true, //unique nie ma bledu na fronta tylko w bazie jest, to blad 11000 czyli e.code === 11000
		minLength: [3, 'Minimum 3 znaki'],
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'Wymagane'],
		minLength: [6, 'Minimum 6 znaków'],
	},
	email: {
		type: String,
		unique: true,
		match: [
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'Proszę podać poprawny adres e-mail',
		],
		lowercase: true,
		required: [true, 'Wymagane'],
		trim: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	//--JESLI CHCESZ POWIĄZAĆ JAKIEŚ ID NP. USER Z COMPANY
	//user: {
	//type: mongoose.Types.ObjectId,
	//required: true,
	//ref: 'Company'} <= można taki klucz lub po prostu --import User from './Company.js' i bez ''
	//--i w controllerze user też dodajesz, tam napisze jbc --tzn: company: req.session.company._id
	apiToken: String,
});

usersSchema.pre('save', function (next) {
	const user = this;
	if (user.isNew) {
		//metoda mongoose .isNew
		user.apiToken = randomstring.generate(30);
	}

	return next();
});

usersSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) return next();
		this.password = await bcrypt.hash(this.password, 12);
		return next();
	} catch (error) {
		return next(error);
	}
});

usersSchema.methods = {
	comparePassword(password) {
		//const user = this; ===== this
		return bcrypt.compareSync(password, this.password);
	},
};

export const Users = mongoose.model('Users', usersSchema);
