/*  Sätt display: none; på audio objektet i inspektorn
    för att spola fram låten när man undersöker repeat knappen
*/
let index;

let songs = [
    "music/y2mate.com - her_losing_N1-i53r-yVQ.mp3",
    "music/y2mate.com - her_avenue_audio_kXvPiT0Lvks.mp3",
    "music/y2mate.com - her_hard_place_audio_ya0LhdgXiaQ.mp3",
    "music/y2mate.com - her_focus_Uj9y5xkHZaU.mp3",
    "music/y2mate.com - her_best_part_audio_ft_daniel_caesar_vBy7FaapGRo.mp3",
    "music/y2mate.com - her_changes_audio_cdDMGa5K8Ug.mp3", 
];

let musicPlayer = document.getElementById("musicPlayer");
let playBtn = document.getElementsByClassName("play-button")[0];
let pauseBtn = document.getElementsByClassName("pause-button")[0];

function playPause() {
    

    if(musicPlayer.paused === true) {
        musicPlayer.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "flex";      
    }
    else {
        musicPlayer.pause();
        playBtn.style.display = "flex";
        pauseBtn.style.display = "none";
    }
}

function songPlaying(number) {
    index = number;
    let currentSongContent = document.getElementsByClassName("content")[number];
    let currentSongArtist = document.getElementsByClassName("songArtist")[number];
    let currentSongTitle = document.getElementsByClassName("songTitle")[number];
    let currentSongCover = document.getElementsByClassName("picture")[number];
    let songArtist = document.getElementsByClassName("songArtist2")[0];
    let songTitle = document.getElementsByClassName("songTitle2")[0];
    let songCover = document.getElementsByClassName("cover")[0];

    currentSongContent.style.background = "#ff6e7f";

    for(let i = 0; i < document.getElementsByClassName("content").length; i++) {
        if(i !== number) {
            document.getElementsByClassName("content")[i].style.background = "none";
        }
    }

    songArtist.innerHTML = currentSongArtist.innerHTML;
    songTitle.innerHTML = currentSongTitle.innerHTML;
    songCover.src = currentSongCover.src;

    musicPlayer.src = songs[number];
    playPause();
}

function nextSong() {
    if (index < 5) {
        songPlaying(index + 1);
    }
    else if (index >= 5) {
        songPlaying(0);
    }
}

function prevSong() {
    if (musicPlayer.currentTime < 5) {
        songPlaying(index - 1);
    } 
    else {
        musicPlayer.currentTime = 0;
    }

}

function updateSongTime() {
    let startTime = document.getElementsByClassName("time")[0];
    let endTime = document.getElementsByClassName("time2")[0];
    let musicBarProgress = document.getElementsByClassName("music-bar-progress")[0];

    let musicStartTime = Math.floor(musicPlayer.currentTime).toString();
    let musicEndTime = Math.floor(musicPlayer.duration).toString();

    startTime.innerHTML = formatSecondsAsTime(musicStartTime);

    if (isNaN(musicEndTime)) {
        endTime.innerHTML = '00:00';
    }
    else {
        endTime.innerHTML = formatSecondsAsTime(musicEndTime);
    }

    musicBarProgress.style.width = Math.floor((musicStartTime / musicEndTime) * 100) + "%";
}

function formatSecondsAsTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds - (min * 60)); 

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }

    return min + ':' + sec;
}

function repeat() {
    let btnRepeat = document.getElementsByClassName("button-repeat")[0];

    musicPlayer.loop = !musicPlayer.loop;

    if (musicPlayer.loop) {
        btnRepeat.style.opacity = "0.3";
    }
    else {
        btnRepeat.style.opacity = "1";
    }
}