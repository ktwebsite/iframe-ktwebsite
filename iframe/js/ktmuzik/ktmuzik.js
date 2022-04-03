$.getJSON("https://www.googleapis.com/youtube/v3/videos?id=P3CRrLoTaeU&key=AIzaSyBSP9iOT6sxfPYE7zs5jrrdI3rkdSn7dO4&part=snippet,contentDetails", function(publish_date){
        const date = publish_date.items[0].snippet.publishedAt;
        const publish_time = document.getElementById('publish-date');
        publish_time.innerHTML = date.slice(0, 10);
    })
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=P3CRrLoTaeU&key=AIzaSyBSP9iOT6sxfPYE7zs5jrrdI3rkdSn7dO4', function(data) {
    const views = data.items[0].statistics.viewCount;
        const number_views = document.getElementById('number-views');
        number_views.innerText = views;
    });

var audio = new Audio("https://cdn.glitch.global/84a5dd4b-f041-4091-88bc-5797c8a8129b/KTMuZik%201.mp3?v=1648969637618");

const play_pause_btn = document.getElementById('play-pause-btn');
var seekslider = document.getElementById("seekslider");

const play_btn = `
<path d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"></path>
`
const pause_btn = `
<path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"></path>
`

play_pause_btn.onclick = () => {
if (play_pause_btn.innerHTML == play_btn) {
    play_pause_btn.innerHTML = pause_btn;
    audio.pause();
} else {
    play_pause_btn.innerHTML = play_btn;
    audio.play();
}
}

function audioSeek () {
    var seekto = audio.duration * (seekslider.value / 100);
    audio.currentTime = seekto;
}

seekslider.addEventListener("change", audioSeek, false);

const time_current = document.getElementById("time-current");
const time_duration = document.getElementById("time-duration");

function currentTime() {
    var nt = audio.currentTime * (100 / audio.duration);
    seekslider.value = nt;
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.floor(audio.duration - durmins * 60);
    if (cursecs < 10) { cursecs = "0" + cursecs; }
    if (dursecs < 10) { dursecs = "0" + dursecs; }
    if (curmins < 10) { curmins = "0" + curmins; }
    if (durmins < 10) { durmins = "0" + durmins; }
    time_current.innerHTML = curmins + ":" + cursecs;
    time_duration.innerHTML = durmins + ":" + dursecs;
}

audio.addEventListener("timeupdate", currentTime);

audio.onended = () => {
play_pause_btn.innerHTML = pause_btn;
}

const speed_2x = document.getElementById("2x");
const speed_1_half = document.getElementById("1.5x");
const speed_1x = document.getElementById("1.0x");
const speed_zero_half = document.getElementById("0.5x");
const speed_zero_25x = document.getElementById("0.25x");
const speed_btn = document.getElementById('speed-btn');
const speed_panel_box = document.getElementById('speed-panel-box');

speed_btn.onclick = () => {
if (speed_panel_box.style.display == 'none') {
    speed_panel_box.style.display = 'block';
    speed_btn.classList.add("speed-btn-animation");
    setTimeout(() => {
        speed_btn.classList.remove("speed-btn-animation");
    }, 500);
} else {
    speed_panel_box.style.display = 'none';
}
}

const speed_value = document.getElementById('speed-value');
const speed_panel_alert_box = document.getElementById('speed-panel-alert-box');

speed_2x.onclick = () => {
    audio.playbackRate = 2;
    speed_panel_box.style.display = 'none';
}

speed_1_half.onclick = () => {
    audio.playbackRate = 1.5;
    speed_panel_box.style.display = 'none';
}

speed_1x.onclick = () => {
    audio.playbackRate = 1;
    speed_panel_box.style.display = 'none';
}

speed_zero_half.onclick = () => {
    audio.playbackRate = 0.5;
    speed_panel_box.style.display = 'none';
}

speed_zero_25x.onclick = () => {
    audio.playbackRate = 0.25;
    speed_panel_box.style.display = 'none';
}

const volume_btn = document.getElementById('volume-btn');
const volume_panel_box = document.getElementById('volume-panel-box');
const volume_oncontextmenu_box = document.getElementById('volume_oncontextmenu_box');

volume_btn.oncontextmenu = () => {
    if(volume_oncontextmenu_box.style.display == 'none') {
        volume_oncontextmenu_box.style.display = 'block';
        volume_panel_box.style.display = 'none';
    } else {
        volume_oncontextmenu_box.style.display = 'none';
    }
}

volume_btn.onclick = () => {
    if(volume_panel_box.style.display == 'none') {
        volume_panel_box.style.display = 'block';
        volume_oncontextmenu_box.style.display = 'none';
    } else {
        volume_panel_box.style.display = 'none';
    }
}

const volume_value = document.getElementById('volume-value');
const volume_slider = document.getElementById('volume-slider');

volume_slider.oninput = () => {
    volume_value.innerText = `${volume_slider.value}%`;
}

const volume_mute_icon = `
    <path d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"></path>
`

const volume_unmute_icon = `
<path d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"></path>
`

volume_slider.onchange = () => {
    audio.volume = volume_slider.value / 100;
    if(volume_slider.value == 0) {
        volume_btn.innerHTML = volume_mute_icon;
    } else {
        volume_btn.innerHTML = volume_unmute_icon;
    }
}

const mute = document.getElementById('mute');
const mute_text = document.getElementById('mute-text');

mute.onclick = () => {
    if(audio.volume != 0) {
        audio.volume = 0;
        volume_oncontextmenu_box.style.display = 'none';
        volume_slider.value = 0;
        volume_value.innerText = `${volume_slider.value}%`;
        mute_text.innerText = 'Unmute';
        volume_btn.innerHTML = volume_mute_icon;
    } else {
        audio.volume = 0.5;
        volume_oncontextmenu_box.style.display = 'none';
        volume_slider.value = 50;
        volume_oncontextmenu_box.style.display = 'none';
        volume_value.innerText = `${volume_slider.value}%`;
        mute_text.innerText = 'Mute';
        volume_btn.innerHTML = volume_unmute_icon;
    }
}

const alert_panel_box = document.getElementById('alert-panel-box');
const alert_panel_box_responsive = document.getElementById('alert-panel-box-responsive');
const loop = document.getElementById('loop');
// const true_false = document.getElementById('true-false');

// document.addEventListener("keydown", event => {
//     if(event.keyCode === 76){
//         if(audio.loop == false){
//             audio.loop = true;
//             loop.style.display = 'block';
//             true_false.innerText = 'Enabled';
//             alert_panel_box.style.display = 'block';

//             setTimeout(() => {
//                 alert_panel_box.style.display = 'none';
//             }, 2000);
//         } else {
//             audio.loop = false;
//             loop.style.display = 'none';
//             true_false.innerText = 'Disabled';
//             alert_panel_box.style.display = 'block';

//             setTimeout(() => {
//                 alert_panel_box.style.display = 'none';
//             }, 2000);
//         }
//     }
// });