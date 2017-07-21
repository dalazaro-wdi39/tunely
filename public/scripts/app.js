/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


$(document).ready(function() {
  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: renderMultipleAlbums
  });

  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/albums', formData, function(album) {
      console.log('album after POST', album);
      renderAlbum(album);  //render the server's response
    });
    $(this).trigger("reset");
  });

  // NOTE: from solutions: event handler for Add Song button
  $('#albums').on('click', '.add-song', function(e) {
    console.log('add-song clicked!');
    var id = $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id', id);
    $('#songModal').data('album-id', id);
    $('#songModal').modal();  // display the modal
  });

});

function renderMultipleAlbums(albums) {
  albums.forEach(function(album) {
    renderAlbum(album);
  });
}

// NOTE: from solution: function that formats each song into a span
function renderSong(song){
  return `<span>&ndash; (${song.trackNumber}) ${song.name} &ndash;</span>`
}

function renderAlbum(album) {
  console.log('rendering album', album);

  // NOTE: from solution: mapped an array of HTML strings using the renderSong function, and joined them together in a string

  album.songsHtml = album.songs.map(renderSong).join("");

  var albumHtml = (`
    <div class="row album" data-album-id="${album._id}">

      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">


          <!-- begin album internal row -->
            <div class='row'>
              <div class="col-md-3 col-xs-12 thumbnail album-art">
                <img src="images/800x800.png" alt="album image">
              </div>

              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Album Name:</h4>
                    <span class='album-name'>${album.name}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Artist Name:</h4>
                    <span class='artist-name'>${album.artistName}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Released date:</h4>
                    <span class='album-releaseDate'>${album.releaseDate}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class="inline-header">Songs:</h4>
                    ${album.songsHtml}
                  </li>
                </ul>
              </div>

            </div>
            <!-- end of album internal row -->

            <div class='panel-footer'>
              <button class='btn btn-primary add-song'>Add Song</button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- end one album -->
  `);
  $('#albums').prepend(albumHtml);
};
