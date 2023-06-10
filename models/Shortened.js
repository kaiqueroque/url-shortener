const mongoose = require('mongoose');

// id: String //Não é necessário pois o MongoDB já cria um _id
const Shortened = mongoose.model('Shortened', {
  _id: String,
  longUrl: String,
  shortUrl: String,
  clicks: Number
})

module.exports = Shortened;