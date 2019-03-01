const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const models = require('./models')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(session({
    secret: "keyboard cat"
}))
app.set('view engine', 'ejs')
app.use(express.static('public'))

const userRoutes = require("./routes/user")
const homeRoutes = require("./routes/home")
const feeltrRoutes = require("./routes/feeltr")


//routing
app.use("/", homeRoutes)
app.use("/users", userRoutes)
app.use("/feeltr", feeltrRoutes)

app.listen(port, () => console.log("listening on port " + port))  
