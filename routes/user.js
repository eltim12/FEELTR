const router = require("express").Router()
const User = require("../models").User
const bcrypt = require('../helpers/encrypt')


router.get("/register", (req, res) => {
    let errMsg = null
    if (req.query.err) {
        errMsg = req.query.err
    }
    res.render('userRegister.ejs', { errMsg })
})

router.post("/register", (req, res) => {
    // res.send(req.query.err)
    User.create({
        fullName: req.body.fullName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
        .then(data => {
            // res.redirect('/user')
            res.send("success register.")
        })
        .catch(err => {
            res.redirect(`/users/register?err=${err.message}`)
        })
    // res.send(req.body)

})

router.get("/login", (req, res) => {
    let errMsg = null
    if (req.query.err) {
        errMsg = req.query.err
    }
    res.render('userLogin.ejs', { errMsg })
})

router.post("/login", (req, res) => {
    // res.send(req.body)
    User
        .findOne({
            where: {
                username: req.body.username
            }
        })
        .then(userData => {
            // res.send(userData)
            if (!userData) {
                throw new Error('No account found with that username.')
            } else {
                if (bcrypt.compare(req.body.password, userData.password) === false) {
                    throw new Error(`The password you have entered is invalid.`)
                } else {
                    res.redirect('/users/login')
                    // throw new Err("user Logged in successfuly.")
                }
            }
        })
        .catch(err => {
            res.redirect(`/users/login?err=${err.message}`)
        })
})

module.exports = router