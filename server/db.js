const mongoose = require('mongoose')
require("dotenv").config();

const database = async () => {

    await mongoose.connect(`${process.env.DATABASE}`)
        .then(() => {
            console.log('MongoDB Connected!')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = database
