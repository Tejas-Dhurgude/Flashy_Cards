const mongoose = require("mongoose")

const cardSchema = mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    meaning: {
        type: String,
        required: true,
    },
    time: {
        type: String,
    },
    module: {
        type: String,
        required: true,
    },
      
    
})

const Card = mongoose.model("Card", cardSchema)

module.exports = Card
