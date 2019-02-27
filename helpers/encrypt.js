var bcrypt = require('bcryptjs')

module.exports = {
    encrypt: function (plainPassword) {
        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(plainPassword, salt)
        return hash
    },

    compare: function (input, password) {
        return bcrypt.compareSync(input, password)
    }
}