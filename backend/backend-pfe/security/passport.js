const employéModel = require('../models/employéModel')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.privateKey;

module.exports = (passport) => {
    return passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        const user = await employéModel.findOne({ _id: jwt_payload.id })
        if (!user) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }));
}