const bcrypt = require('bcryptjs')

class Password {
    static hashPassword(password) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    }

    static checkPassword(passLogin, pass) {
        return bcrypt.compareSync(passLogin, pass)
    }
}

module.exports = Password