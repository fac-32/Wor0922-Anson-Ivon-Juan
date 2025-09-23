// Toggle hidden information
const toggleButton = document.getElementById("btn-toggle1");
const hiddenInfo = document.querySelector(".hidden-info");

toggleButton.addEventListener("click", () => {
  hiddenInfo.classList.toggle("hidden-info");
});

// Change background color of the box
const colorButton = document.getElementById("btn-change-color");
const colorBox = document.getElementById("color-box");

colorButton.addEventListener("click", () => {
  const red = Math.floor(Math.random() * 256);
const green = Math.floor(Math.random() * 256);
const blue = Math.floor(Math.random() * 256);

const randomColor = `rgb(${red}, ${green}, ${blue})`;
colorBox.style.backgroundColor = randomColor;
});

// Form submission handling
const form = document.getElementById("feedback-form");
const formResponse = document.getElementById("form-response");

// form.addEventListener("input", () => {
//   console.log(form.validity);
// });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const feedback = document.getElementById("feedback").value;
  if (name.trim().length === 0 || feedback.trim().length === 0) {
    alert('Please fille in both fields before submitting.');
    return;
  }
  if (!/^[a-z0-9\s]+$/.test(name)) {
    alert('Please only include alphanumeric characters in your name.');
  }
  formResponse.textContent = `Thank you, ${name}, for your feedback: "${feedback}"`;
  form.reset();
});

// Ball following mouse on canvas
let circleWidth = 20;
let mouseX = 350;
let mouseY = 250;
let ballX = 0;
let ballY = 0;

const drawBall = (ctx) => {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.ellipse(ballX, ballY, circleWidth, circleWidth, 0, 0, Math.PI * 2);
  ctx.fill();
};

function updateMouseCoordinates(event) {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
}

const animateBall = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (mouseX !== undefined && mouseY !== undefined) {
    let speed = 0.03;
    ballX += (mouseX - ballX) * speed;
    ballY += (mouseY - ballY) * speed;
  }

  drawBall(context);
};

const runGame = () => {
  animateBall();
};

const canvasSection = document.createElement("div");
canvasSection.style.display = "flex";
canvasSection.style.justifyContent = "center";
document.getElementById("section4").appendChild(canvasSection);

const canvas = document.createElement("canvas");
const MAX_WIDTH = 700;
const MAX_HEIGHT = 500;

function resizeCanvas() {
  // Calculate desired width/height
  let newWidth = window.innerWidth / 1.5;
  let newHeight = window.innerWidth / 2;

  // Clamp to maximums
  canvas.width = Math.min(newWidth, MAX_WIDTH);
  canvas.height = Math.min(newHeight, MAX_HEIGHT);
}

// Run once and also on resize
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


canvas.style.border = "1px black solid";
canvasSection.appendChild(canvas);

const context = canvas.getContext("2d");

canvas.addEventListener("mousemove", updateMouseCoordinates);
setInterval(runGame, 10);

/* PROMPTS FOR ADDITIONAL INTERACTIONS

1. Add functionality to highlight the navigation link of the current section as the user scrolls.
2. Implement a light/dark mode toggle using CSS root variables.
3. Create a dynamic list where users can add and remove items.
4. Add validation to the feedback form to ensure name and feedback are not empty.
5. Use localStorage to save the user's name for personalized greetings.
6. Animate the color change of the box with a smooth transition.
7. Display a live character counter for the feedback textarea.
8. Implement drag-and-drop functionality for rearranging items in a list.
9. Add a countdown timer to a section, resetting after it reaches zero.
10. Fetch and display data from a public API (e.g., random jokes or quotes).

*/
