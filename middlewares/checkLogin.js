const session = require('express-session')

module.exports = (req, res, next) => {
    if (req.session.userLoggin) {
        next()
    }
    else {
        res.redirect('/users/login')
    }
}