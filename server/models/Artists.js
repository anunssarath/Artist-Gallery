const mongoose = require('mongoose')

const ArtistSchema = new mongoose.Schema({
    name: String,
    email : String,
    password: String
})

const ArtistModel = mongoose.model("artistss",ArtistSchema) 
module.exports = ArtistModel