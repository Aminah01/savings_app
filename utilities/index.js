
const bcrypt = require('bcrypt');
const saltRounds = 10;

const  hashMyPassword = (password) => {
    return new Promise((resolve, reject) => {

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) {
                    reject(err)
                }
                resolve([hash, salt])
                })
        })
    })
}



const generateOtp = () => {

    const otp = Math.floor(1000 + Math.random() * 9000)

    return otp
}


module.exports = { hashMyPassword, generateOtp }