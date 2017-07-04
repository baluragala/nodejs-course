var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var generateId = require('./plugins/generateId');
var crypto = require('crypto');

var sampleUser = {
	"email": "bala@zeolearn",
	"first_name": "bala",
	"last_name": "ragala",
	"password": "1234"
};

var userSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		index: {
			unique: true
		}
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	mobile: Number,
	gender: String,
	birth_date: {
		type: Date,
		required: false
	},
	salt: String
});

userSchema.plugin(generateId());

userSchema
	.virtual('full_name')
	.get(function () {
		this.first_name + "," + this.last_name;
	});


/**
 * Validations
 */

// Validate empty email
userSchema
	.path('email')
	.validate(function (email) {
		return email.length;
	}, 'Email cannot be blank');

// Validate empty password
userSchema
	.path('password')
	.validate(function (password) {
		return password.length;
	}, 'Password cannot be blank');

// Validate email is not taken
userSchema
	.path('email')
	.validate(function (value, respond) {
		var self = this;
		return this.constructor.findOne({email: value})
			.then(function (user) {
				if (user) {
					if (self.id === user.id) {
						return respond(true);
					}
					return respond(false);
				}
				return respond(true);
			})
			.catch(function (err) {
				throw err;
			});
	}, 'Email address is in use.');

var validatePresenceOf = function (value) {
	return value && value.length;
};

/**
 * Pre-save hook
 */
userSchema
	.pre('save', function (next) {
		// Handle new/update passwords
		if (this.isModified('password')) {
			if (!validatePresenceOf(this.password)) {
				next(new Error('Invalid password'));
			}

			// Make salt with a callback
			var _this = this;
			this.makeSalt(function (saltErr, salt) {
				if (saltErr) {
					next(saltErr);
				}
				_this.salt = salt;
				_this.encryptPassword(_this.password, function (encryptErr, hashedPassword) {
					if (encryptErr) {
						next(encryptErr);
					}
					_this.password = hashedPassword;
					next();
				});
			});
		} else {
			next();
		}
	});

/**
 * Methods
 */
userSchema.methods = {
	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} password
	 * @param {Function} callback
	 * @return {Boolean}
	 * @api public
	 */
	authenticate: function (password, callback) {
		if (!callback) {
			return this.password === this.encryptPassword(password);
		}

		var _this = this;
		this.encryptPassword(password, function (err, pwdGen) {
			if (err) {
				callback(err);
			}

			if (_this.password === pwdGen) {
				callback(null, true);
			}
			else {
				callback(null, false);
			}
		});
	},

	/**
	 * Make salt
	 *
	 * @param {Number} byteSize Optional salt byte size, default to 16
	 * @param {Function} callback
	 * @return {String}
	 * @api public
	 */
	makeSalt: function (byteSize, callback) {
		var defaultByteSize = 16;

		if (typeof arguments[0] === 'function') {
			callback = arguments[0];
			byteSize = defaultByteSize;
		}
		else if (typeof arguments[1] === 'function') {
			callback = arguments[1];
		}

		if (!byteSize) {
			byteSize = defaultByteSize;
		}

		if (!callback) {
			return crypto.randomBytes(byteSize).toString('base64');
		}

		return crypto.randomBytes(byteSize, function (err, salt) {
			if (err) {
				callback(err);
			}
			return callback(null, salt.toString('base64'));
		});
	},

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @param {Function} callback
	 * @return {String}
	 * @api public
	 */
	encryptPassword: function (password, callback) {
		if (!password || !this.salt) {
			return null;
		}

		var defaultIterations = 10000;
		var defaultKeyLength = 64;
		var salt = new Buffer(this.salt, 'base64');

		if (!callback) {
			return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
				.toString('base64');
		}

		return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, function (err, key) {
			if (err) {
				callback(err);
			}
			return callback(null, key.toString('base64'));
		});
	}
};

module.exports = mongoose.model('User', userSchema);
