// NOTE: require mongoose, define schema
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// NOTE: schema
let SongSchema = new Schema({
  name: String,
  trackNumber: Number
});

// NOTE: model
let Song = mongoose.model('Song', SongSchema);

// NOTE: export model
module.exports = Song;
