const router = require("express").Router()
const Photo = require("../models").Photo
const Tag = require("../models").Tag

router.get("/", (req, res) => {
    // res.send("INI HOME")
    Photo.findAll({
        order: [["id", "DESC"]],
        include: { model: Tag }
    })
        .then(allPhoto => {
            let data = {
                photo: allPhoto,
                session: req.session.userLoggin
            }
            // res.send(data)
            res.render("home.ejs", { output: data })
        })
        .catch(err => {
            res.send(err)
        })
})

router.post("/searchTag", (req,res) => {
    Tag
        .findOne({
            where: {
                name: req.body.searchTag
            },include: {model:Photo}
        })
        .then(tagData => {
            if(tagData) {
                let data = {
                    byTags: tagData,
                    session: req.session.userLoggin
                }
                res.render("searchByTag.ejs", {output:data})
            } else {
                res.render("error.ejs", {output: new Error(`unfortunately, no result was found.`)})
            }
            // console.log("=================================",data.byTags.name, "=================================")
            // res.send(data)
        })
        .catch(err=> {
            res.send(err)
        })
    // res.send(req.body)
})




module.exports = router