var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let Song = require('./song');

var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  songs: [ Song.schema ],
  genres: [ String ]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
