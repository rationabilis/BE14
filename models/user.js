/* eslint-disable func-names */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const isURL = require("validator/lib/isURL");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: [2, "От 2 до 30 букв"],
		maxlength: [30, "От 2 до 30 букв"],
		required: true,
	},
	about: {
		type: String,
		minlength: [2, "От 2 до 30 букв"],
		maxlength: [30, "От 2 до 30 букв"],
		required: true,
	},
	avatar: {
		type: String,
		validate: {
			validator: (v) => isURL(v),
			message: "Не соотвествует формату ссылки",
		},
		required: true,
	},
	email: {
		type: String,
		validate: {
			validator: (v) => isEmail(v),
			message: "Не соотвествует формату электронной почты",
		},
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false,
	},
});

userSchema.statics.findUserByCredentials = function (email, password) {
	return this.findOne({ email }).select("+password")
		.then((user) => {
			if (!user) {
				return Promise.reject(new Error("Неправильные почта или пароль"));
			}

			return bcrypt.compare(password, user.password)
				.then((matched) => {
					if (!matched) {
						return Promise.reject(new Error("Неправильные почта или пароль"));
					}

					return user;
				});
		});
};

module.exports = mongoose.model("user", userSchema);
