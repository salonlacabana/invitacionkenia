import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCountdown();
  initAudioPlayer();
  createPetals();
});

// 1. Scroll Reveal Animation using Intersection Observer
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });
}

// 2. Countdown Timer
function initCountdown() {
  // Set the date we're counting down to
  const countDownDate = new Date("Jul 18, 2026 17:00:00").getTime();

  // Update the count down every 1 second
  const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in the elements
    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if(dEl) dEl.innerHTML = days < 10 ? '0' + days : days;
    if(hEl) hEl.innerHTML = hours < 10 ? '0' + hours : hours;
    if(mEl) mEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
    if(sEl) sEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;

    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "<div class='gold-text cinzel-font text-xl'>¡El gran día ha llegado!</div>";
    }
  }, 1000);
}

// 3. Audio Player Logic
function initAudioPlayer() {
  const audio = document.getElementById("bg-music");
  const playBtn = document.getElementById("play-music-btn");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  let isPlaying = false;

  if(!playBtn || !audio) return;

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
      playBtn.classList.remove("pulse-anim");
    } else {
      audio.play().catch(e => console.log("Audio play prevented by browser:", e));
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
      playBtn.classList.add("pulse-anim");
    }
    isPlaying = !isPlaying;
  });
}

// 4. Create falling petals
function createPetals() {
  const containers = document.querySelectorAll('.petals-container');
  if(containers.length === 0) return;

  const petalCount = 30;

  containers.forEach(container => {
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      
      // Randomize properties
      const size = Math.random() * 10 + 5; // 5px to 15px
      const left = Math.random() * 100; // 0% to 100%
      const animDuration = Math.random() * 5 + 5; // 5s to 10s
      const animDelay = Math.random() * 5; // 0s to 5s
      
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.left = `${left}%`;
      petal.style.animationDuration = `${animDuration}s`;
      petal.style.animationDelay = `${animDelay}s`;
      
      container.appendChild(petal);
    }
  });
}
