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
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = randomColor;
});

// Form submission handling
const form = document.getElementById("feedback-form");
const formResponse = document.getElementById("form-response");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const feedback = document.getElementById("feedback").value;
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
    let speed = 0.3;
    ballX += (mouseX - ballX) * speed;
    ballY += (mouseY - ballY) * speed;
  }

  drawBall(context);
};

const runGame = () => {
  animateBall();
};

const canvasSection = document.createElement("section");
canvasSection.classList.add("content-section");
canvasSection.style.display = "flex";
canvasSection.style.justifyContent = "center";
document.getElementById("section4").appendChild(canvasSection);

const canvas = document.createElement("canvas");
canvas.setAttribute("width", "700");
canvas.setAttribute("height", "500");
canvas.style.border = "1px black solid";
canvasSection.appendChild(canvas);

const context = canvas.getContext("2d");

canvas.addEventListener("mousemove", updateMouseCoordinates);
setInterval(runGame, 100);

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
