const logo = document.querySelector("logo-header");
const logoSpan = document.querySelectorAll(".logo");

///////////////////////////////////////////
let counter = document.querySelector(".counter");
let loader = document.querySelector(".loader");
let preloader = document.querySelector(".preloader");
let visit = document.querySelector(".see");
let count = 0;
///////////////////////////////////////////////
const mysound = document.querySelector("#mysound");
const play = document.querySelector(".blue");
const dance = document.querySelector(".dance");
let isPlaying = false;
/////////////////////////////////////////
let paragraphs = [...document.querySelectorAll(".disappear")];
let spans = [];
////////////////////////////

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    logoSpan.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add("active");
      }, (idx + 1) * 2000);
    });
  });

  const clearscreen = () => {
    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.add("fade");
        }, (idx + 1) * 100);
      });
    }, 600);
    mysound.play();

    play.textContent = "Cancel";
    play.style.color = "green";
    dance.textContent = "Silence😟";

    setTimeout(() => {
      preloader.style.top = "-100vh";
    }, 1200);
  };

  visit.addEventListener("click", clearscreen);

  let counterfunction = setInterval(() => {
    if (count < 101) {
      counter.textContent = `${count}%`;
      loader.style.width = `${count}%`;
      count++;
    } else {
      clearInterval(counterfunction);
    }
  }, 20);
});
///////////////////////////////////////////////////

const soundtrack = () => {
  if (!isPlaying) {
    play.textContent = "Button😏";
    play.style.color = "blue";
    dance.textContent = "dancing";
    mysound.pause();
  } else {
    play.textContent = "Cancel";
    play.style.color = "green";
    dance.textContent = "Silence😟";
    mysound.play();
  }
  isPlaying = !isPlaying;
};

play.addEventListener("click", soundtrack);
////////////////////////////
function updateTime() {
  var now = new Date();
  var timeElement = document.getElementById("time");

  var timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  var dateString = now.toLocaleDateString();

  var dateTimeString = timeString + " on " + dateString;
  timeElement.textContent = dateTimeString;
}

// Update time immediately and set interval to update every second
updateTime();
setInterval(updateTime, 1000);
/////////////////////////////////////////////////
paragraphs.forEach((paragraph) => {
  let htmlString = "";
  let pArray = paragraph.textContent.split("");
  for (let i = 0; i < pArray.length; i++) {
    htmlString += `<span class="revealtext">${pArray[i]}</span>`;
  }
  paragraph.innerHTML = htmlString;
});

spans = [...document.querySelectorAll(".revealtext")];

function textreveal() {
  // Iterate through all of the span elements in the document
  for (let i = 0; i < spans.length; i++) {
    // Check if the span element's parent element is located in the top half of the window
    if (
      spans[i].parentElement.getBoundingClientRect().top <
      window.innerHeight / 2
    ) {
      // Get the top and left positions of the span element
      let { left, top } = spans[i].getBoundingClientRect();
      // Calculate the opacity value for the span element
      top = top - window.innerHeight * 0.4;
      let opacityValue =
        1 - top * 0.01 * (left * 0.001) < 0.1
          ? 0.1
          : 1 - (top * 0.01 * (left * 0.001)).toFixed(3);
      opacityValue = opacityValue > 1 ? 1 : opacityValue.toFixed(3);
      // Set the opacity value for the span element
      spans[i].style.opacity = opacityValue;
    }
  }
}
window.addEventListener("scroll", () => {
  textreveal();
});

///////////////////////////////////////////////
