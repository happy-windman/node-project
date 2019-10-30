const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const hash = (password) => {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}


const compare = (password, hash) => {
    return bcrypt.compareSync(password, hash); // true

}

const generateToken = (username) => {
    return new Promise((resolve, reject) => {
        let cert = fs.readFileSync(path.resolve(__dirname,'../key/rsa_private_key.pem'))
        jwt.sign({ username }, cert, { algorithm: 'RS256' }, function (err, token) {
            resolve(token);
        });
    })
}

const verifyToken= (token)=>{
    return new Promise((resolve, reject) => {
    let cert = fs.readFileSync(path.resolve(__dirname,'../key/rsa_public_key.pem'))
        jwt.verify(token,cert,function (err, decoded) {
            resolve(decoded);
        });

    })
}
    module.exports = {
        hash,
        compare,
        generateToken,
        verifyToken
    }