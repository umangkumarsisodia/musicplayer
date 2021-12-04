let songs = [
    {
        songName : "Suna Hai - Jubin Nautiyal",
        path : "1.mp3",
        time:"3:13"
    },
    {
        songName : "Sakhiyaan - Maninder Buttar",
        path : "2.mp3",
        time:"2:59"
    },
    {
        songName : "Tujhe Kitna Chahne Lage Hum",
        path : "3.mp3",
        time:"4:44"
    },

    {
        songName : "Kinna Sona - Mithoon",
        path : "4.mp3",
        time:"5:03"
    },

    {
        songName : "Liggi - Ritviz",
        path : "5.mp3",
        time:"5:44"
    },

    {
        songName : "Chitta - Manan Bhardwaj",
        path : "6.mp3",
        time:"5:44"
    },

    {
        songName : "Time Table 2 - Kulwinder Billa",
        path : "7.mp3",
        time:"5:44"
    },

    {
        songName : "Tum Se Hi - Mohit Chauhan",
        path : "8.mp3",
        time:"5:44"
    },

    {
        songName : "Khairiyat - Arijit Singh",
        path : "9.mp3",
        time:"5:44"
    },
    
    {
        songName : "Khabbi Seat - Ammy Ammy Virk",
        path : "10.mp3",
        time:"3:24"
    }
]

let gif = document.getElementById('gif');
let songName = document.getElementById('songName');
let musicIndex = 0;
let audioElement = new Audio(songs[musicIndex].path);



let playMusic = document.getElementById("playMusic");
playMusic.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        songName.innerHTML = songs[musicIndex].songName;
        gif.setAttribute('src','./img/play.gif');
        audioElement.play();
        playMusic.classList.remove('fa-play-circle');
        playMusic.classList.add('fa-pause-circle');
    }
    
    else{
        gif.setAttribute('src','./img/play2.jpg');
        audioElement.pause();
        playMusic.classList.remove('fa-pause-circle');
        playMusic.classList.add('fa-play-circle');
    }
})

//Update range value acc. to the time
let playbackSpeed = document.getElementById("playbackSpeed");
audioElement.addEventListener('timeupdate',()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    updateTrackTime();
    playbackSpeed.value = progress;
    if(audioElement.currentTime == audioElement.duration){
        let x = document.getElementsByClassName('song-play');
        x[musicIndex].classList.remove('fa-pause-circle');
        x[musicIndex].classList.add('fa-play-circle');
        audioElement.currentTime = 0;
        audioElement.src = songs[musicIndex+1].path;
        audioElement.play();
        x[musicIndex+1].classList.remove('fa-play-circle');
        x[musicIndex+1].classList.add('fa-pause-circle');
        songName.innerHTML = songs[musicIndex+1].songName;
        animatedText.innerHTML = songs[musicIndex+1].songName;
        musicIndex = musicIndex + 1;
    }
})

//Change range
playbackSpeed.addEventListener('change',()=>{
    audioElement.currentTime = playbackSpeed.value * audioElement.duration/100;
})


songs.forEach((element , i)=>{
    document.getElementsByClassName('song-name')[i].innerText = songs[i].songName;
    document.getElementsByClassName('timeDuration')[i].innerText = songs[i].time;
})

function makeAllPlay(element){
    Array.from(document.getElementsByClassName('song-play')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('song-play')).forEach((element , i)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlay();
        let index = parseInt(e.target.id);
        audioElement.currentTime = 0;
        if(audioElement.paused){
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[index].path;
            musicIndex = index;
            audioElement.play();
            songName.innerHTML = songs[index].songName;
            gif.setAttribute('src','./img/play.gif');
            playMusic.classList.remove('fa-play-circle');
            playMusic.classList.add('fa-pause-circle');
        }

        else{
            gif.setAttribute('src','./img/play2.jpg');
            playMusic.classList.add('fa-play-circle');
            playMusic.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            audioElement.pause();
        }
    })
})

let forwardMusic = document.getElementById('forwardMusic');
forwardMusic.addEventListener('click',(e)=>{
    audioElement.currentTime = 0;
    let x = document.getElementsByClassName('song-play');
    x[musicIndex].classList.remove('fa-pause-circle');
    x[musicIndex].classList.add('fa-play-circle');
    audioElement.src = songs[musicIndex+1].path;
    x[musicIndex+1].classList.remove('fa-play-circle');
    x[musicIndex+1].classList.add('fa-pause-circle');
    audioElement.play();
    songName.innerHTML = songs[musicIndex+1].songName;
    musicIndex = musicIndex + 1;
})


let backwardMusic = document.getElementById('backwardMusic');
backwardMusic.addEventListener('click',(e)=>{
    audioElement.currentTime = 0;
    let x = document.getElementsByClassName('song-play');
    x[musicIndex].classList.remove('fa-pause-circle');
    x[musicIndex].classList.add('fa-play-circle');
    audioElement.src = songs[musicIndex-1].path;
    x[musicIndex-1].classList.remove('fa-play-circle');
    x[musicIndex-1].classList.add('fa-pause-circle');
    audioElement.play();
    songName.innerHTML = songs[musicIndex-1].songName;
    musicIndex = musicIndex - 1;
})


function greeting(){
    let greet = document.getElementById('greet');
    let d = new Date();
    if(d.getHours()<12){
        greet.innerHTML = "Good Morning!";
    }
    else if(d.getHours()>=12 && d.getHours()<16){
        greet.innerHTML = "Good Afternoon!";
    }
    else if(d.getHours()>=16 && d.getHours()<20){
        greet.innerHTML = "Good Evening!";
    }
    else{
        greet.innerHTML = "Good Night!";
    }
}

function updateTrackTime(){
    let ct = document.getElementById('ct');
    let dt = document.getElementById('dt');
    let cmin = Math.floor(audioElement.currentTime/60);  
    let csec = Math.floor(audioElement.currentTime%60);
    let dmin = Math.floor(audioElement.duration/60);
    let dsec = Math.floor(audioElement.duration%60);
    console.log(dmin);
    if(csec<10){
        csec = "0" + csec;
    }
    else{
        csec = csec;
    }

    if(dsec<10){
        dsec = "0"+dsec;
    }
    else{
        dsec = dsec;
    }
    ct.innerHTML = cmin + ":" + csec;
    dt.innerHTML = dmin + ":" + dsec ;
}

let up = document.getElementById('up');
up.addEventListener('click', ()=>{
    let hide = document.getElementById('hide');
    let trans = document.getElementById('trans');
    let right = document.getElementById('right');
    if(hide.style.display!='none') {
        hide.style.display = 'none';
        up.classList.remove('fa-chevron-up');
        up.classList.add('fa-chevron-down');
        trans.style.display = 'flex';
        trans.style.justifyContent = 'center';
        trans.style.alignItems = 'center';
        trans.style.transform = "translateY(0vh)";
        right.style.position = 'absolute';
        right.style.bottom = '0px';
    }

    else{
        trans.style.display = 'none';
        hide.style.display = 'block';
        right.style.position = 'relative';
        up.classList.remove('fa-chevron-down');
        up.classList.add('fa-chevron-up');
    }
})
greeting();
