const express = require('express');

const app = express();
app.use(express.json());
exports.app = express();
const paypal = PayPal('PDubbsSolutions')(express.json());
exports.paypal = paypal;
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try{
        const paymentIntent = await paypal.paymentIntents.create({
            amount: amount * 100,
            currency: 'cad',
        });
    res.status(200).json({ clientSecret: paymentIntent.client_secret     
    });
    }catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.listen(3000, ()=> {
    console.log('Server running on port 3000');
});

const express = require('express');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('flash');
const { PayPal } = require('./PayPal');
require('dotenv').config();

require('./config/passport')(passport);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
app.set ('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended :true}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:process.env.MONGODB_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24} //1 day
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.use || null;
    next();
});

const upload = multer({ dest:'uploads/'});
function ensureAuthenticated(req, res, next){
    if (req.isAthenticated()){
        return next();
    }
    req.flash('error_msg', 'Login to view this Resource');
    res.redirect('/login');
}
exports.ensureAuthenticated = ensureAuthenticated;
app.get('/', (req,res) => {
    res.render('index');
});
//======Auth Routes======//
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/logout', (req, res) =>{
    req.logout(err => {
        if (err) {return next(err); }
        req.flash('success_msg', 'Logout Successful');
        res.redirect('/login');
    });
});

