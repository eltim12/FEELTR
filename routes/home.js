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
    res.send(req.body)
})




module.exports = router