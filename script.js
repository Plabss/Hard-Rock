function searchSongs() {
    const songName = document.getElementById("songName").value;
    const url = `https://api.lyrics.ovh/suggest/:${songName}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            findingSongs(data.data);
        })
}

function findingSongs(songs) {
    const songsContainer = document.getElementById("songsContainer")
    songsContainer.innerHTML = ''
    songs.forEach(song => {
        console.log(song)
        const songDiv = document.createElement('div')
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success" onclick="forLyric('${song.artist.name}','${song.title}')">Get Lyrics</button>
        </div> 
        `
        songsContainer.appendChild(songDiv)

    });

}

function forLyric(artist, title) {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
}


function displayLyrics(lyrics) {
    const lyricDiv = document.getElementById("lyrics")
    lyricDiv.innerText = ''
    lyricDiv.innerText = lyrics;


}