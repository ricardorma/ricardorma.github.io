var video = document.getElementById('vid');
var reproductor = document.querySelector('.reproductor');
var barra = document.querySelector('.barra');
var btnPlay = document.getElementById('play');
var progreso = document.querySelector('.progreso');
var volume = document.querySelector('.volume_range');
var mutear = document.getElementById('mutear');
var pantalla = document.getElementById('pantalla');
var aumentar = document.getElementById('aumentar');
var normal = document.getElementById('normal');
var reducir = document.getElementById('reducir');
var playlistLista = document.querySelector(".playlist");

    var playlist = [
        {name: "Video 1 - Cancion", src: "./videos/video1.mp4"},
        {name: "Video 2 - El Mundo", src: "./videos/video2.mp4"},
        {name: "Video 3 - Luces", src: "./videos/video3.mp4"}
      ];
    
    for (let i in playlist) {
        let row = document.createElement("div");
        row.className = "vRow";
        row.innerHTML = playlist[i]["name"];
        row.addEventListener("click", () => { vidPlay(i); });
        playlist[i]["row"] = row;
        playlistLista.appendChild(row);
      }

      var vidNow = 0, // current video
    vidStart = false, // auto start next video
 
// (B2) PLAY SELECTED VIDEO
vidPlay = (idx, nostart) => {
  vidNow= idx;
  vidStart = nostart ? false : true;
  video.src = playlist[idx]["src"];
  for (let i in playlist) {
    if (i == idx) { playlist[i]["row"].classList.add("now"); }
    else { playlist[i]["row"].classList.remove("now"); }
  }
  btnPlay.firstChild.data = "play_circle";
};

function funcionPlay() {
    if(video.paused){
        btnPlay.firstChild.data = "pause_circle"
        video.play();
    } else {
        btnPlay.firstChild.data = "play_circle";
        video.pause();
    }
}

function funcionMutear() {
    if(!video.muted){
        video.muted = true;
        mutear.firstChild.data = "hearing_disabled"
    } else {
        video.muted = false;
        mutear.firstChild.data = "hearing"
    }
}


video.addEventListener('timeupdate', function() {
    var posicion = video.currentTime/video.duration;
    barra.style.width = posicion * 100 + "%";
});

progreso.addEventListener('click', (e) => {
    var duracion = video.duration;
    var progresion = progreso.clientWidth;
    var click = e.offsetX;
    video.currentTime = (click/progresion)*duracion;
})

// Volumen
function volumen() {
    video.volume = volume.value/100;
  }

  volume.addEventListener('change', ()=>{
      volumen();
  });

//Tamano pantalla
pantalla.addEventListener('click', () => {
    if (!reproductor.classList.contains("openFullScreen")) {
      reproductor.classList.add("openFullScreen");
      pantalla.innerHTML = "fullscreen_exit";
      reproductor.requestFullscreen();
    } else {
      reproductor.classList.remove("openFullScreen");
      pantalla.innerHTML = "fullscreen";
      document.exitFullscreen();
    }
  });

//Velocidad
aumentar.addEventListener('click', () => {
    video.playbackRate = 1.25;
});

normal.addEventListener('click', () => {
    video.playbackRate = 1;
});

reducir.addEventListener('click', () => {
    video.playbackRate = 0.5;
});