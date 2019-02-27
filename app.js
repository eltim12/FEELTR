const userRoutes = require("./routes/user")
const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))


//routing
app.use("/users", userRoutes)


app.listen(port, () => console.log("listening on port" + port))  