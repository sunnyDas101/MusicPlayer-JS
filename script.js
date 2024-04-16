//Initializing variables
let songIndex = 0
let audioElement = new Audio(`songs/Die-For-You.mp3`)
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem')) 
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay')) 
let masterSongName = document.getElementById('masterSongName')
let previous = document.getElementById('previous')
let next = document.getElementById('next')
let songs = [
    {songName: "The-Weekend-Die-For-You", filePath: "songs/Die-For-You.mp3", coverPath: "covers/Die_For_You.jpg"},
    {songName: "The-Weekend-Starboy-Ft-Daft-Punk", filePath: "songs/Starboy.mp3", coverPath: "covers/Starboy.jpg"},
    {songName: "The-Weekend-Party-Monster", filePath: "songs/Party-Monster.mp3", coverPath: "covers/Party_Monster.jpg"},
    {songName: "The-Weekend-Ordinary-Life", filePath: "songs/Ordinary-Life.mp3", coverPath: "covers/Ordinary_Life.jpg"},
    {songName: "The-Weekend-Reminder", filePath: "songs/Reminder.mp3", coverPath: "covers/Reminder.jpg"},
    {songName: "The-Weekend-Secrets", filePath: "songs/Secrets.mp3", coverPath: "covers/Secrets.jpg"},
    {songName: "The-Weekend-Six-Feet-Under", filePath: "songs/Six-Feet-Under.mp3", coverPath: "covers/Six_Feet_Under.jpg"}
]
//Initializing variables

songItems.forEach(function(element, i){
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName
})

//Handle play/pause click
masterPlay.addEventListener('click', function(){
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        gif.style.opacity = 1
    } else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play')
        gif.style.opacity = 0
    }
})
//Handle play/pause click

// Listen to Events
audioElement.addEventListener('timeupdate', function(){
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)     // Formula to take out the percentage of the audio
    myProgressBar.value = progress;
    // Update Seekbar
})

myProgressBar.addEventListener('change', function(){
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100     // Fourmula to take out the current time of the audio
})
// Listen to Events

function makeAllPlays(){
    songItemPlay.forEach(function(element){
        element.classList.remove('fa-pause')
        element.classList.add('fa-play')
        gif.style.opacity = 1
    })
}

songItemPlay.forEach(function(element){
    element.addEventListener('click', function(e){
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play')
        e.target.classList.add('fa-pause')
        masterSongName.innerHTML = songs[songIndex].songName
        audioElement.src = songs[songIndex].filePath
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
    })
})

next.addEventListener('click', function(){
    if(songIndex>=6){
        songIndex = 0
    } else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath
    masterSongName.innerHTML = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
})

previous.addEventListener('click', function(){
    if(songIndex<=0){
        songIndex = 0
    } else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath
    masterSongName.innerHTML = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
})
