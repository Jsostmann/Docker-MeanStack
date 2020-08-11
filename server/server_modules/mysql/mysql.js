const bcrypt = require('bcryptjs');


function sayHello() {
    console.log("mysql helper");
}

function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

function comparePasswords(enteredPassword, hashedPassword) {
    return bcrypt.compareSync(enteredPassword,hashedPassword);
}



module.exports = {sayHello, hashPassword, comparePasswords};
