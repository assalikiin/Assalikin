const text = "ANWARUSSALIKIIN";
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

const slides = document.querySelector(".slides");

let autoSlide = setInterval(() => {

  slides.scrollBy({
    left: 340,
    behavior: "smooth"
  });

  if (
    slides.scrollLeft + slides.clientWidth >=
    slides.scrollWidth - 20
  ) {

    setTimeout(() => {
      slides.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    }, 1000);

  }

}, 4000);

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
