let scrollTimeout;
let currentTrack = 1;
let currentAudio;

window.addEventListener("scroll", () => {
  //Clear the timeout while the window is scrolling to run the callback only when it is not
  window.clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    //Find closest track to the centre of the window
    currentTrack = Math.floor(
      window.pageXOffset / document.querySelector("#track-1").offsetWidth + 0.5
    );

    //Navigate to the current track
    document
      .querySelector(`[href="#track-${currentTrack}"]`)
      .dispatchEvent(new MouseEvent("click"));

    if (currentAudio) currentAudio.pause();
    currentAudio = document.querySelector(`#track-${currentTrack} video`);
    if (currentAudio) currentAudio.play();
  }, 100);
});

//Change track on arrow key press
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Right":
    case "ArrowRight":
    case "Down":
    case "ArrowDown":
    case "PageDown":
      currentTrack = Math.min(currentTrack + 1, 13);
      document
        .querySelector(`[href="#track-${currentTrack}"]`)
        .dispatchEvent(new MouseEvent("click"));
      break;
    case "Left":
    case "ArrowLeft":
    case "Up":
    case "ArrowUp":
    case "PageUp":
      currentTrack = Math.max(currentTrack - 1, 0);
      document
        .querySelector(`[href="#track-${currentTrack}"]`)
        .dispatchEvent(new MouseEvent("click"));
      break;
  }
});

//Play or pause the audio on click on track title
[...document.querySelectorAll("main > article > h1")].forEach((trackTitle) =>
  trackTitle.addEventListener("click", () => {
    if (!currentAudio) return;
    if (currentAudio.paused) currentAudio.play();
    else currentAudio.pause();
  })
);
