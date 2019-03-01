const router = require("express").Router()
const User = require('../models').User
const Photo = require("../models").Photo
const Tag = require("../models").Tag

router.get("/", (req, res) => {
    Photo.findAll({ include: [User, Tag], order: [['id', 'DESC']] })
        .then(data => {
            res.render('home', { result: data, output: req.session.userLoggin })
            // res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post("/searchTag", (req, res) => {
    Tag
        .findOne({
            where: {
                name: req.body.searchTag
            }, include: { model: Photo }
        })
        .then(tagData => {
            if (tagData) {
                let data = {
                    byTags: tagData,
                    session: req.session.userLoggin
                }
                res.render("searchByTag.ejs", { output: data })
            } else {
                res.render("error.ejs", { output: new Error(`unfortunately, no result was found.`) })
            }
            // console.log("=================================",data.byTags.name, "=================================")
            // res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
    // res.send(req.body)

})




module.exports = router