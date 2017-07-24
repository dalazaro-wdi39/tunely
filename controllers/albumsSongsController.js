// albumsSongsController
var db = require('../models');

// NOTE: song index
function index(req, res) {
  db.Album.findById(req.params.albumId, function(err, foundAlbum) {
    console.log('responding with songs:', foundAlbum.songs);
    res.json(foundAlbum.songs);
  });
}

// POST '/api/albums/:albumId/songs'
function create(req, res) {
  db.Album.findById(req.params.albumId, function(err, foundAlbum) {
    console.log(req.body);
    var newSong = new db.Song(req.body);  // dangerous, in a real app we'd validate the incoming data
    foundAlbum.songs.push(newSong);
    foundAlbum.save(function(err, savedAlbum) {
      console.log('newSong created: ', newSong);
      res.json(newSong);  // responding with just the song, some APIs may respond with the parent object (Album in this case)
    });
  });
}

// NOTE: delete songs
function destroy(req, res) {
  db.Album.findById(req.params.albumId, function(err, foundAlbum) {
    console.log(foundAlbum);
    var correctSong = foundAlbum.songs.id(req.params.songId);
    if (correctSong) {
      correctSong.remove();
      foundAlbum.save(function(err, saved) {
        console.log('REMOVED ', correctSong.name, 'FROM ', saved.songs);
        res.json(correctSong);
      });
    } else {
      res.send(404);
    }
  });
}

// NOTE: update album song
function update(req, res) {
  db.Album.findById(req.params.albumId, function(err, foundAlbum) {
    console.log(foundAlbum);
    var correctSong = foundAlbum.songs.id(req.params.songId);
    if (correctSong) {
      console.log(req.body);
      correctSong.trackNumber = req.body.trackNumber;
      correctSong.name = req.body.name;
      foundAlbum.save(function(err, saved) {
        console.log('UPDATED', correctSong, 'IN ', saved.songs);
        res.json(correctSong);
      });
    } else {
      res.send(404);
    };
  });

}

module.exports = {
  index: index,
  create: create,
  destroy: destroy,
  update: update
};
