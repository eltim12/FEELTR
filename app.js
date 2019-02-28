const userRoutes = require("./routes/user")
const express = require('express')
const app = express()
const port = 3000
const multer = require('multer')
const models = require('./models')
const fs = require("fs")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.static('public'))

// M U L T E R
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } })
// M U L T E R


app.get('/feeltr/:id', (req, res) => {
    res.render('feeltr')
})

app.post("/feeltr/:id", upload.single("image"), (req, res) => {
    var strToReplace = req.body.image
    var strImage = strToReplace.replace(/^data:image\/[a-z]+;base64,/, "");
    var base64Str = strImage
    let path = '/uploads/' + Date.now() + '.png'
    fs.writeFileSync('./public' + path, base64Str, {
        encoding: "base64"
    })

    models.Photo.create({
        photoUrl: path,
        UserId: req.params.id
    })
        .then(data => {
            // console.log("AAAAA")
            res.send('success')
        })
        .catch(err => {
            // console.log(err)
            res.send(err)
        })
})

app.use("/users", userRoutes)


app.listen(port, () => console.log("listening on port " + port))  