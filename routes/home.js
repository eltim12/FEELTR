const router = require("express").Router()
const Photo = require("../models").Photo

router.get("/",(req,res) => {
    // res.send("INI HOME")
    // Photo.findAll()
    res.render("home.ejs", {userLoggin: req.session.userLoggin})
})



module.exports = router