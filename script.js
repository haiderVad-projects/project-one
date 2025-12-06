gsap.from(".about", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});
gsap.from(".Image", {
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power3.out"
});
gsap.from("#memebutton", {
  opacity: 0,
  y: 40,
  duration: 0.7,
  ease: "power3.out"
});
gsap.from("#gamebutton", {
  opacity: 0,
  y: 40,
  duration: 0.7,
  ease: "power3.out"
});
gsap.from(".logo", {
  opacity: 0,
  y: 20,
  duration: 0.7,
  ease: "power3.out"
});
gsap.from("#homebutton", {
  opacity: 0,
  y: 40,
  duration: 0.7,
  ease: "power3.out"
});

const pages = {
  home: document.querySelector(".first_page"),
  game: document.querySelector(".game_page"),
  meme: document.querySelector(".meme_page")
};

function showPage(pageName) {
  Object.values(pages).forEach(p => {
    p.classList.remove("active");
    p.classList.add("hide");
  });

  const page = pages[pageName];
  page.classList.remove("hide");

  // delay for animation
  setTimeout(() => page.classList.add("active"), 10);
}

document.querySelector("#gamebutton").onclick = () => showPage("game");
document.querySelector("#memebutton").onclick = () => showPage("meme");
document.querySelector("#homebutton").onclick = () => showPage("home");

const video = document.getElementById("memeVid");
const btn = document.getElementById("playBtn");

btn.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        btn.textContent = "⏸"; // pause icon
    } else {
        video.pause();
        btn.textContent = "▶"; // play icon
    }
});

// meme navigation

const memes = [
  "meme_1.jpg",
  "meme_2.jpg",
  "meme_3.jpg",
  "meme_4.jpg",
  "meme_5.jpg",
  "meme_6.jpg",
  "meme_7.jpg"
]

let meme_previous = document.querySelector("#prev")
let meme_next = document.querySelector("#next")
let meme_image = document.querySelector(".meme_image")

let meme_index = 0;
meme_image.style.backgroundImage = `url(${memes[meme_index]})`;

meme_previous.onclick = () => {
  meme_index--;
  if (meme_index < 0) {
    meme_index = memes.length - 1;
  }
  meme_image.style.backgroundImage = `url(${memes[meme_index]})`;
}

meme_next.onclick = () => {
  meme_index++;
  if (meme_index >= memes.length) {
    meme_index = 0;
  }
  meme_image.style.backgroundImage = `url(${memes[meme_index]})`;
}

const videos = [
  "video_1.mp4",
  "video_2.mp4",
  "video_4.mp4",
  "video_5.mp4",
  "video_3.mp4",
  "video_6.mp4"
]

let video_previous = document.querySelector("#prev_video")
let video_next = document.querySelector("#next_video")
let meme_video = document.querySelector("#memeVid")

let video_index = 0;
meme_video.src = videos[video_index];

video_previous.onclick = () => {
  video_index--;
  if (video_index < 0) {
    video_index = videos.length - 1;
  }
  meme_video.src = videos[video_index];
  btn.textContent = "▶";
}

video_next.onclick = () => {
  video_index++;
  if (video_index >= videos.length) {
    video_index = 0;
  }
  meme_video.src = videos[video_index];
  btn.textContent = "▶";
}

// Game Logic

var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

hole.addEventListener('animationiteration', () => {
  var random = Math.floor(Math.random() * 151) + 50;
  hole.style.top = random + "px";
  counter++;
  document.getElementById("score_span").innerHTML = counter;
});

setInterval(function() {
  if (!gameStarted) return;
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  if (jumping == 0){
    character.style.top = (characterTop + 1) + "px";
  }
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  var holeBottom = holeTop + 150;
  if (characterTop > 360 || ((blockLeft < 50 && blockLeft > -40) && (characterTop < holeTop || characterTop + 40 > holeBottom))){
  gameStarted = false;
  block.style.animationPlayState = "paused";
  hole.style.animationPlayState = "paused";
  document.querySelector(".game_result").classList.remove("game_hide");
  document.querySelector(".game_start").classList.remove("game_hide");
  document.querySelector("#jumpBtn").classList.add("game_hide");
  if (counter > parseInt(document.getElementById("highest_span").innerHTML)) {
    document.getElementById("highest_span").innerHTML = counter;
  }
  document.getElementById("score_span").innerHTML = "0";
  counter = 0;
  document.getElementById("mysong").play();
  resetGame();
}},10);

function jump() {
  jumping = 1;
  let jumpCount = 0;
  var jumpInterval = setInterval(function() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if((characterTop>6)&&(jumpCount<15)){
      character.style.top = (characterTop - 3) + "px";
    }
    if (jumpCount > 20){
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);
}
document.getElementById("jumpBtn").onclick = () => jump();

function restartAnimation(el) {
  el.style.animation = 'none';
  el.offsetHeight; // force reflow
  el.style.animation = '';
}

function resetGame() {
  character.style.top = "150px";

  var random = Math.floor(Math.random() * 151) + 50;
  hole.style.top = random + "px";

  jumping = 0;

  // restart animations only if game is started
  if (gameStarted) {
    restartAnimation(block);
    restartAnimation(hole);
  }
}



let gameStarted = false;
document.getElementById("start_button").addEventListener("click", startGame);

function startGame() {
  if (gameStarted) return;  // avoid double start

  gameStarted = true;

  // Start animations
  block.style.animationPlayState = "running";
  hole.style.animationPlayState = "running";

  // Reset game state
  resetGame();
  document.querySelector(".game_start").classList.add("game_hide");
  document.querySelector("#jumpBtn").classList.remove("game_hide");
  document.querySelector(".game_result").classList.add("game_hide");
}
block.style.animationPlayState = "paused";
hole.style.animationPlayState = "paused";



