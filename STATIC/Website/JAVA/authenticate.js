const bcrypt = require('bcrypt');
const saltRounds =10;
const passowrd ='userPassword123';
bcrypt.hash(password, saltRounds, (err, hash) =>{
    if (err) throw (err);
    console.log('Hashed password:',hash);
});

    "Content-type"; "application/x-www-form-urlencoded"