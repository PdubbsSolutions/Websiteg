const passport = require('passport');
const { app } = require("./app");
const User = require('./models/User');

app.post('/register', async (req, res) => {
    const { username, email, phonenumber, password, password2 } = req.body;
    let errors = [];
    if (!usename || !email || !phonenumber || !password || !password2) {
        errors.push({ msg: 'Please fill in all required fields' });
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
        if (password.length < 8) {
            errors.push({ msg: 'Password should be at least 8 characters' });
        }
        if (errors.length > 0) {
            res.render('register', {
                errors,
                username,
                email,
                phoneNumber,
                password,
                password2
            });
        } else {
            try {
                const user = await User.findOne({ email: email });
                if (user) {
                    errors.push({ msg: 'Email is already registered to an account' });
                    res.render('register', {
                        errors,
                        username,
                        email,
                        phoneNumber,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({ username, email, phoneNumber, password });
                    await newUser.save();
                    req.flash('success_msg', 'You are not Registered and can Log in to find your PDubbs Solutions!');
                    res.redirect('/login');
                }
            } catch (err) {
                console.error(err);
                res.render('register', {
                    errors: [{ msg: 'An Error occured during your registration' }],
                    username,
                    email,
                    phoneNumber,
                    password,
                    password2
                });
            }
        }
    }
}
    //===Login Page===//
    ,
    //===Login Page===//
    app.get('/login', (req, res) => {
        res.render('login');
    }),
    app.post('/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    }));
