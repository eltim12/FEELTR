const router = require("express").Router()
const User = require('../models').User
const Photo = require("../models").Photo
const Tag = require("../models").Tag

router.get("/", (req, res) => {
    Photo.findAll({ include: [User, Tag] })
        .then(data => {
            res.render('home', { result: data, output: req.session.userLoggin })
        })
        .catch(err => {
            res.send(err)
        })
})




module.exports = router