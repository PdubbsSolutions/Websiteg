import mongoose from 'mongoose';
import bcrpyt from 'bcrypt';
import UserSchema from 'UserSchema';
import { app, ensureAuthenticated, paypal } from '../app';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
        minlength: 10
    },
    email:{
        type: String,
        require:true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password:{
        type:String,
        require: true,
        minlength: 6
    }
});
UserSchema.pre('save', async function (next){
    try{
        if (!this.isModified('password')) return next();
        const hashed = await bcrpyt.hash(this.password,10);
        this.password = hashed;
        next();
    } catch(err) {
        next(err);
    }
});
UserSchema.methods.comparePassword = function (candidatePassword){
    return bcrpyt.compare(candidatePassword, this.password);
};
module.exports = mongoose.model('User', UserSchema);//==dashboard==//
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {user: req-user});
});
//==Bundle==//
app.post('/purchase-bundle', ensureAuthenticated, async (req, res) => {
    res.render('dashboard', { user: req.user });
        const { bundleID, token} =req.body; //===ADD BUNDLE ID====//
        try {
            const charge = await paypal.charges.create({
                amount: 1500 * 1.13,
                currency: 'cad',
                description: 'HR Management Template Bundle ${bundleId}',
                source: token
            });
            res.status(200).send('Payment successful');
        } catch (err) {
            res.status(500).send('Payment Failed');
        }
        });
app.post('/request-document', ensureAuthenticated,
    upload.single('document'), (req, res) => {
        const documentPath =reg.file.path;
        res.send('Custom document request received from ${name}')
    }
)

//==zoom 1:1==//
app.post('book-session', ensureAuthenticated, async (req, res) => {
    const {email, phoneNumber, name, date, time } = req.body;
})   

