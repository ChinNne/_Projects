//playlist
let playlist = [
    {song_name: "Anime Eyes", duration: "3:18", artist: "Kacey Musgraves", backdrop: "kacey.jpeg",
        album_cover: "deeperwell.WEBP", path: "animeeyes.mp3"},
    {song_name: "Cherry Blossom", duration: "3:04", artist: "Kacey Musgraves",
        backdrop: "kacey.jpeg", album_cover: "cherryblossom.PNG", path: "cherry%20blossom.mp3"},
    {song_name: "Golden Hour", duration: "3:18", artist: "Kacey Musgraves", backdrop: "kacey.jpeg",
        album_cover: "goldenhour.JPG", path: "Golden%20Hour.mp3"},
    {song_name: "From The Start", duration: "2:50", artist: "Laufey", backdrop: "laufey2.jpeg",
        album_cover: "bewitched.jpg", path: "From%20The%20Start.mp3"},
    {song_name: "Must Be Love", duration: "3:05", artist: "Laufey", backdrop: "laufey2.jpeg",
        album_cover: "bewitched.jpg", path: "%20Must%20Be%20Love%20.mp3"},
    {song_name: "Dear Soulmate", duration: "4:20", artist: "Laufey", backdrop: "laufey2.jpeg",
        album_cover: "eikaboutlove.png", path: "Dear%20Soulmate.mp3"},
    {song_name: "August", duration: "4:22", artist: "Taylor Swift", backdrop: "taylor.jpeg",
        album_cover: "folklore.png", path: "08%20august.mp3"},
    {song_name: "All Too Well (10 minute Version)(Taylor's Version)", duration: "10:13",
        artist: "Taylor Swift", backdrop: "taylor.jpeg", album_cover: "red.jpg",
        path: "alltoowell.mp3"},
    {song_name: "Howling at Wolves", duration: "3:11", artist: "Stephen Sanchez",
        backdrop: "stephen.jpeg", album_cover: "angelface.JPG", path: "howlinatwolves.mp3"},
    {song_name: "Emotional Vacation", duration: "3:32", artist: "Stephen Sanchez",
        backdrop: "stephen.jpeg", album_cover: "angelface.JPG", path: "emotionalvacation.mp3"},
    {song_name: "Ancient Gates", duration: "5:25", artist: "Brooke Ligertwood",
        backdrop: "brooke.jpeg", album_cover: "seven.jpg", path: "Ancient%20Gates.mp3"},
    {song_name: "A Thousand Hallelujahs", duration: "5:09", artist: "Brooke Ligertwood",
        backdrop: "brooke.jpeg", album_cover: "seven.jpg", path: "A%20Thousand%20Hallelujahs.mp3"},
    {song_name: "Angel", duration: "3:39", artist: "Halle", backdrop: "halle.jpeg",
        album_cover: "angel.png", path: "Angel.mp3"},
    {song_name: "In Your Hands", duration: "2:52", artist: "Halle", backdrop: "halle.jpeg",
        album_cover: "inyourhands.png", path: "inyourhands.mp3"},
    {song_name: "Rhythm & Blues", duration: "2:24", artist: "Ayra Starr", backdrop: "ayra1.jpeg",
        album_cover: "turned21.png", path: "rhythmnblues.mp3"},
    {song_name: "Commas", duration: "2:37", artist: "Ayra Starr", backdrop: "ayra1.jpeg",
        album_cover: "turned21.png", path: "commas.mp3"},
    {song_name: "poster boy", duration: "2:46", artist: "Lyn Lapid", backdrop: "lyn.jpeg",
        album_cover: "tlit2c.png", path: "poster%20boy.mp3"},
    {song_name: "ok with it", duration: "2:45", artist: "Lyn Lapid", backdrop: "lyn.jpeg",
        album_cover: "tlit2c.png", path: "ok%20with%20it.mp3"},
    {song_name: "Logba Logba", duration: "3:03", artist: "Simi", backdrop: "simi.jpeg",
        album_cover: "tbhsimi.jpeg", path: "Logba%20Logba.mp3"},
    {song_name: "Ayo", duration: "3:44", artist: "Simi", backdrop: "simi.jpeg",
        album_cover: "ayo.jpg", path: "Ayo.mp3"}
];

// images/texts
let backdrop = document.body.style;
let album_cover = document.querySelector(".album_cover");
let song_name = document.querySelector(".song_name");
let artist_name = document.querySelector(".artist_name");

// buttons
let like_button = document.querySelector(".like");
let previous_button = document.querySelector(".previous");
let play_pause_button = document.querySelector(".play_pause");
let skip_button = document.querySelector(".skip");
let shuffle_button = document.querySelector(".shuffle");
let volume = document.querySelector(".volume");

// sliders
let current_time = document.querySelector(".current_time");
let song_duration = document.querySelector(".song_duration");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");

// other globally used values
let song_index = 0;
let isPlaying = false;
let isLiked = false;
let isMuted = false;
let isShuffled = false;
let updateTimer;

// audio element for the player
let now_playing_song = document.createElement("audio");

function resetValues() {
    current_time.textContent = "0:00";
    song_duration.textContent = "0:00";
    seek_slider.value = 0;
}

loadSong(song_index);

function loadSong(song_index) {
    clearInterval(updateTimer);
    resetValues();
    if (isShuffled) {
        song_index = shuffleHelper();
    }
    now_playing_song.src = playlist[song_index]["path"];
    now_playing_song.load();

    album_cover.style.backgroundImage = "url(" + playlist[song_index]["album_cover"] + ")";
    backdrop.backgroundImage = "url(" + playlist[song_index]["backdrop"] + ")";
    song_name.textContent = playlist[song_index]["song_name"];
    artist_name.textContent = playlist[song_index]["artist"];
    song_duration.textContent = playlist[song_index]["duration"];

    updateTimer = setInterval(seekUpdate, 1000);

    if (isShuffled) {
        now_playing_song.addEventListener("ended", loadSong);
    }
    else{
        now_playing_song.addEventListener("ended", nextSong);
    }
}

function nextSong() {
    if (song_index < playlist.length - 1)
        song_index += 1;
    else {
        song_index = 0;
    }
    loadSong(song_index);
    playSong();
}

//we call this function using onclick in HTML
function playpauseSong() {
    if (!isPlaying) {
        playSong();
    }
    else {
        pauseSong();
    }
}

function playSong() {
    now_playing_song.play();
    isPlaying = true;
    play_pause_button.innerHTML = "<i class=\"material-icons\" style=\"font-size: 60px; " +
        "opacity: 1\">pause_circle_filled</i>";
}

function pauseSong() {
    isPlaying = false;
    play_pause_button.innerHTML = "<i class=\"material-icons\" style=\"font-size: 60px; " +
        "opacity: 1\">play_circle_filled</i>";
    now_playing_song.pause();
}

// also called onclick
function prevSong() {
    if (Math.floor(now_playing_song.currentTime % 60) >= 3) {
        now_playing_song.load();
        playSong();

    }
    // there maybe a problem with shuffling
    else {
        if (song_index > 0) {
            song_index -= 1;
            loadSong(song_index);
            playSong();
        }
        else {
            song_index = playlist.length - 1;
            loadSong(song_index);
            playSong();
        }
    }
}

function skipSong() {
    if (song_index < playlist.length - 1) {
        song_index += 1;
    }
    else {
        song_index = 0;
    }
    loadSong(song_index);
    playSong();
}

// again on click
function likeSong() {
    if (isLiked) {
        like_button.innerHTML = "<i class=\"material-icons\" style=\"color:#f30c46; " +
            "font-size: 24px\">favorite_border</i>";
        isLiked = false;
    }
    else {
        like_button.innerHTML = "<i class=\"material-icons\" style=\"color:#f30c46; " +
            "font-size: 24px\">favorite</i>";
        isLiked = true;
    }
}

// onclick for shuffle
function shufflePlaylist () {
    if (!isShuffled) {
        shuffle_button.innerHTML = "<i class=\"material-icons\" style=\"font-size: 27px; " +
            "color:limegreen\">shuffle</i>";
        isShuffled = true;
    }
    else {
        shuffle_button.innerHTML = "<i class=\"material-icons\" style=\"font-size: 27px\">" +
            "shuffle</i>";
        isShuffled = false
    }
}

function shuffleHelper () {
    return song_index = Math.floor(Math.random() * (playlist.length + 1));
}

function muteVolume() {
    if (!isMuted) {
        isMuted = true
        now_playing_song.muted = true;
        volume.innerHTML = "<i class=\"material-icons\" style=\"font-size: 24px\">volume_mute</i>"
    }
    else {
        isMuted = false
        now_playing_song.muted = false;
        volume.innerHTML = "<i class=\"material-icons\" style=\"font-size: 24px\">volume_up</i>"
    }
}

function seekUpdate() {
    if (!isNaN(now_playing_song.duration)) {
        seek_slider.value = now_playing_song.currentTime;
        seek_slider.max = Math.floor(now_playing_song.duration) + 1;
        let curr_minutes = Math.floor(now_playing_song.currentTime / 60);
        let curr_seconds = Math.floor(now_playing_song.currentTime % 60);
        // let duration_min = Math.floor(now_playing_song.duration / 60);
        // let duration_sec = Math.floor(now_playing_song.duration % 60);

        if (curr_seconds < 10) {curr_seconds = "0" + curr_seconds;}
        // if (duration_sec < 10) {duration_sec = "0" + duration_sec;}

        current_time.textContent = curr_minutes + ":" + curr_seconds;
    }
}

function seekTo () {
    now_playing_song.currentTime = seek_slider.value;
}

function setVolume () {
    now_playing_song.volume = volume_slider.value / 100;
}
