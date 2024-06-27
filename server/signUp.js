const express = require("express")
const cors = require("cors")
const database = require("./db")
const User = require("./models/user")

const app = express()

app.use(cors())
app.use(express.json())

database()

app.post("/signup", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.insertMany([{ email: email, password: password }])
        .then(() => {
            res.json({ "success": true })
        })
        .catch((err) => {
            res.json({ "success": false, "error": err })
        })
})