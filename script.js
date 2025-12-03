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

