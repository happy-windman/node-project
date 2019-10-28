const bcrypt = require('bcrypt')

const hash = (password) => { 
   
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}


const compare = (password,hash) =>{
    return bcrypt.compareSync(password, hash); // true

}

module.exports = {
    hash,
    compare
}