// auth.js
let passport = require("passport");
let passportJWT = require("passport-jwt");
let User = require('../models/user'); // get our mongoose model
let config = require("./config.js");
let ExtractJwt = passportJWT.ExtractJwt;
let Strategy = passportJWT.Strategy;
let params = {
	secretOrKey: config.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function () {
	let strategy = new Strategy(params, function (payload, done) {

		User.findOne({
			name: payload.name
		}, function (err, user) {

			if (err) throw err;

			if (user) {
				return done(null, {
					user
				});
			} else {
				return done(new Error("User not found"), null);
			}

		});


		/*if (user) {
		 return done(null, {
		 id: user.id
		 });
		 } else {
		 return done(new Error("User not found"), null);
		 }*/
	});
	passport.use(strategy);
	return {
		initialize: function () {
			return passport.initialize();
		},
		authenticate: function () {
			return passport.authenticate("jwt", config.jwtSession);
		}
	};
};