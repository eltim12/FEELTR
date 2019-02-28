const router = require("express").Router()
const bcrypt = require('../helpers/encrypt')
const User = require("../models").User
const Photo = require("../models").Photo

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
            res.redirect('/users/login')
            // res.send("success register.")
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
                    req.session.userLoggin = {
                        id: userData.id,
                        name: userData.fullName
                    }
                    res.redirect('/')
                }
            }
            console.log(req.session);
            
        })
        .catch(err => {
            res.redirect(`/users/login?err=${err.message}`)
        })
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

router.get("/:id/profile", (req, res) => {
    User
        .findByPk(req.params.id, { include: { model: Photo } })
        .then(dataFound => {
            let data = {
                userData: dataFound,
                session: req.session
            }
            // res.send(data)
            res.render("userPost.ejs", {output: data})
        })
        .catch(err => {
            res.send(err)
        })
    // res.render("userPost.ejs")
})

router.get("/:id/edit", (req, res) => {
    User
        .findByPk(req.params.id)
        .then(dataFound => {
            res.send(dataFound)
        })
        .catch(err => {
            res.send(err)
        })
})

// router.get("/:id/editProfile",(req,res) => {
//     req.send(req.params)
//     // res.render("userEdit.ejs")
// })

router.get("/session", (req, res) => {
    res.send(req.session)
})


module.exports = router