const router = require('express').Router()
const { User, Photo, PhotoTag, Tag } = require('../models')
const fs = require("fs")
const upload = require('../helpers/multer')
const checkLogin = require('../middlewares/checkLogin')

router.get('/:id', checkLogin, (req, res) => {
    res.render('feeltr', { id: req.params.id })
})

router.post("/:id", upload.single("image"), (req, res) => {
    var strToReplace = req.body.image
    var strImage = strToReplace.replace(/^data:image\/[a-z]+;base64,/, "");
    var base64Str = strImage
    let path = '/uploads/' + Date.now() + '.png'
    fs.writeFileSync('./public' + path, base64Str, {
        encoding: "base64"
    })

    Photo.create({
        photoUrl: path,
        UserId: req.params.id
    })
        .then(data => {
            res.send('success')
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router