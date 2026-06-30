document.querySelectorAll(".rp-city").forEach(function(card,index){
var button=card.querySelector(".rp-theme-button");
var key="rp-city-theme-"+index;
var savedTheme=localStorage.getItem(key);
if(savedTheme){card.dataset.theme=savedTheme}
if(!button){return}
button.addEventListener("click",function(){
var currentTheme=card.dataset.theme||"light";
var nextTheme=currentTheme==="light"?"dark":"light";
card.dataset.theme=nextTheme;
localStorage.setItem(key,nextTheme);
});
});

/* LECTEUR MUSIQUE */
document.querySelectorAll(".rp-music").forEach(function(player){
var audio=player.querySelector("audio");
var play=player.querySelector(".rp-play");
var track=player.querySelector(".rp-bar");
var bar=player.querySelector(".rp-bar span");
var duration=player.querySelector(".rp-duration");

function formatTime(seconds){
if(!Number.isFinite(seconds)){return"00:00"}
var minutes=Math.floor(seconds/60);
var rest=Math.floor(seconds%60);
return String(minutes).padStart(2,"0")+":"+String(rest).padStart(2,"0");
}

if(!audio||!play||!track||!bar||!duration){return}

play.addEventListener("click",function(){
if(audio.paused){
audio.play();
}else{
audio.pause();
}
});

audio.addEventListener("play",function(){
player.classList.add("is-playing");
play.setAttribute("aria-label","Mettre la musique en pause");
});

audio.addEventListener("pause",function(){
player.classList.remove("is-playing");
play.setAttribute("aria-label","Lancer la musique");
});

audio.addEventListener("loadedmetadata",function(){
duration.textContent=formatTime(audio.duration);
});

audio.addEventListener("timeupdate",function(){
var progress=audio.duration?(audio.currentTime/audio.duration)*100:0;
bar.style.width=progress+"%";
duration.textContent=formatTime(audio.currentTime);
});

track.addEventListener("click",function(event){
if(!audio.duration){return}
var box=track.getBoundingClientRect();
var ratio=(event.clientX-box.left)/box.width;
audio.currentTime=Math.max(0,Math.min(audio.duration,ratio*audio.duration));
});

audio.addEventListener("ended",function(){
bar.style.width="0%";
duration.textContent=formatTime(audio.duration);
});
});
