const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

const userRoutes = require("./routes/user")
const homeRoutes = require("./routes/home")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.use(session({
    secret: "keyboard cat"
}))

//routing
app.use("/", homeRoutes)
app.use("/users", userRoutes)


app.listen(port, () => console.log("listening on port" + port))  