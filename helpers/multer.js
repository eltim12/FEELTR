const multer = require('multer')

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

module.exports = upload