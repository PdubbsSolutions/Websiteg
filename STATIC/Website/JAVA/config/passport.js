const LocalStrategy = require('passport0local').Strategy;
const User = require('../models/User');

modules.export = function (passport) { 
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            User.findOne({email: email }, (err, user) => {
                if (err) return done(err);
                if (!user) {
                    return done(null, false, { message: 'We were unable to locate an account attached to the email address you provided.'});
                }
                    user.comparePassword(password).then(isMatch => {
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {message: 'Incorrect Password'});
                        }
                }).catch(err => done(err));
            });
        })
    );
};   