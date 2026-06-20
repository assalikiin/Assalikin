const welcomeOverlay = document.getElementById("welcomeOverlay");
const welcomeForm = document.getElementById("welcomeForm");
const visitorNameInput = document.getElementById("visitorName");
const skipWelcome = document.getElementById("skipWelcome");

const WELCOME_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfUGb6PYb6MQYG7S0W1MSmQbhnXT18WLaUlzx6pMaF4ndFErg/formResponse";

const WELCOME_ENTRY = "entry.398847967";

document.body.style.overflow = "hidden";

async function sendWelcomeName(name) {
  const formData = new FormData();
  formData.append(WELCOME_ENTRY, name.trim() || "Guest");

  try {
    await fetch(WELCOME_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });
  } catch (err) {
    console.error(err);
  }
}

function closeWelcome() {
  welcomeOverlay.classList.add("hide");
  document.body.style.overflow = "";
  setTimeout(() => {
    welcomeOverlay.remove();
  }, 450);
}

welcomeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await sendWelcomeName(visitorNameInput.value);
  closeWelcome();
});

skipWelcome.addEventListener("click", async () => {
  await sendWelcomeName("Guest");
  closeWelcome();
});

setTimeout(() => {
  visitorNameInput.focus();
}, 200);
const text = "ASSALIKIIN";
const typingText = document.getElementById("typingText");

let i = 0;

function typeWriter() {
  if (i < text.length) {
    typingText.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 120);
  }
}

typeWriter();

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("show");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("show");
  });
});

const reveals = document.querySelectorAll(
  ".section,.hero,.card,.feedback-card,.title-card"
);

function revealElements() {
  reveals.forEach(el => {

    const rect = el.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    if (rect.top < screenHeight * 0.85 &&
        rect.bottom > screenHeight * 0.15) {

      el.classList.add("active");
      el.classList.add("reveal");

    } else {

      el.classList.remove("active");

    }

  });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

let selectedRating = 0;

document
  .querySelectorAll(".emoji-rating button")
  .forEach(btn => {

    btn.addEventListener("click", () => {

      document
        .querySelectorAll(".emoji-rating button")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      selectedRating = btn.dataset.rate;

    });

  });

const submitBtn = document.getElementById("submitFeedback");
const popup = document.getElementById("popup");

submitBtn.addEventListener("click", async () => {

  const message =
    document.getElementById("message").value.trim();

  if (!selectedRating) {
    alert("Choose a rating first.");
    return;
  }

  if (!message) {
    alert("Write your feedback.");
    return;
  }

  const formData = new FormData();

  formData.append(
    "entry.1811337757",
    selectedRating
  );

  formData.append(
    "entry.991357781",
    message
  );

  try {

    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSf6LI9pwpFTnTVBFennNwdrGwDJ8_JhWOyhMPTF8XehZeFQWw/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        body: formData
      }
    );

    popup.classList.add("show");

    document.getElementById("message").value = "";

    document
      .querySelectorAll(".emoji-rating button")
      .forEach(b => b.classList.remove("active"));

    selectedRating = 0;

    setTimeout(() => {
      popup.classList.remove("show");
    }, 2500);

  } catch (err) {

    console.error(err);

    alert("Failed to send feedback.");

  }

});

document.querySelectorAll(".card").forEach(card => {

  card.addEventListener("touchstart", () => {
    card.style.transform = "scale(0.96)";
  });

  card.addEventListener("touchend", () => {
    card.style.transform = "scale(1)";
  });

});

window.addEventListener("scroll", () => {

  const hero = document.querySelector(".hero");

  let scroll = window.scrollY;

  hero.style.transform =
    `translateY(${scroll * 0.15}px)`;

  hero.style.opacity =
    Math.max(1 - scroll / 700, 0);

});

const themeToggle =
document.getElementById("themeToggle");

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "light"){
document.body.classList.add("light");
themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("light");

const isLight =
document.body.classList.contains("light");

themeToggle.textContent =
isLight ? "☀️" : "🌙";

localStorage.setItem(
"theme",
isLight ? "light" : "dark"
);

});

const targetDate =
new Date("September 13, 2027 00:00:00").getTime();

function updateCountdown(){

const now = new Date().getTime();

const distance = targetDate - now;

const days =
Math.floor(distance / (1000 * 60 * 60 * 24));

const hours =
Math.floor((distance % (1000 * 60 * 60 * 24))
/ (1000 * 60 * 60));

const minutes =
Math.floor((distance % (1000 * 60 * 60))
/ (1000 * 60));

const seconds =
Math.floor((distance % (1000 * 60))
/ 1000);

document.getElementById("days").textContent = days;
document.getElementById("hours").textContent = hours;
document.getElementById("minutes").textContent = minutes;
document.getElementById("seconds").textContent = seconds;

}

updateCountdown();
setInterval(updateCountdown,1000);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
