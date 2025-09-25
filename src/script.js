// Toggle hidden information
const question = document.getElementById("Question");
const nextQuestionEl = document.getElementById("next-question");
const Truebtn = document.getElementById("True");
const Falsebtn = document.getElementById("False");
const hiddenInfo = document.querySelector(".hidden-info");
const feeedback = document.getElementById("feedback");
const score = document.getElementById("score");

const section1 = document.getElementById("section1");

let GameOver = false;
let questionNum = 5;
let canAnswer = true;

async function loadQuestions()
{
  const res = await fetch('/quiz');
  const data = await res.json();
  question.textContent = data.question;
  score.innerText = "0 / " + questionNum;

}

async function sendAnswer(answer)
{
  const res = await fetch("/answer", 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({answer})
    });

    if(GameOver || !canAnswer) return;
    const data = await res.json();
    feeedback.textContent = data.message;
    score.innerText = data.score + " / " + questionNum + " " + data.quizEndMessage;
    if(data.quizEndMessage != "") GameOver = true;
    canAnswer = false;
}

async function nextQuestion()
{
    const res = await fetch("/next", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  const data = await res.json();

  if(GameOver) return;
  question.innerText = data.question;
  canAnswer = true;
}

async function resetQuiz()
{
  GameOver = false;
  score.innerText = "0 / " + questionNum;
  const didReset = await fetch("/reset");

}


// start everything when page loads
window.addEventListener("DOMContentLoaded", loadQuestions);
window.addEventListener("beforeunload", resetQuiz);

section1.addEventListener("click", (e) => {
  const target = e.target;

  if(GameOver) return;

  if (target.id == "next-question") {

    nextQuestion();
    hiddenInfo.style.display = "none"; 
  }

  if(target.id === "True" || target.id === "False") 
  {
    hiddenInfo.style.display = "block"; 
    sendAnswer(target.id);
  }
});



// Change background color of the box
let colourInterval;
const colorBox = document.getElementById("color-box");

function colourBoxChange () {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = randomColor;
};

const colourBtnGp = document.getElementById("colour-btn-group");
colourBtnGp.addEventListener("click", (event) => {
    switch(event.target.id) {
        // clear interval is not explicitly called went the click actually lands on buttons
        // to prevent triggering when clicking on empty space inside wrapper div
        case "manual-interval":
            clearInterval(colourInterval);
            colourInterval = setInterval(colourBoxChange, 500);
            break;
        case "manual-stop":
            clearInterval(colourInterval);
            break;
        case "auto-stop":
            clearInterval(colourInterval);
            setTimeout(() => {
                clearInterval(colourInterval);
            }, 5000);
            colourInterval = setInterval(colourBoxChange, 500);
            break;
    }
})

// Form submission handling
const form = document.getElementById("feedback-form");
const formResponse = document.getElementById("form-response");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const feedback = document.getElementById("feedback").value;

  // check something other than space has been entered
  if (name.trim().length === 0 || feedback.trim().length === 0) {
    alert('Please fille in both fields before submitting.');
    return;
  }

  // make sure name is alphanumeric
  if (!/^[a-z0-9\s]+$/.test(name)) {
    alert('Please only include alphanumeric characters in your name.');
  }
  formResponse.textContent = `Thank you, ${name}, for your feedback: "${feedback}"`;
  form.reset();
});

// show the number of characters in the feedback field
const counter = document.getElementById("character-counter");
const feedback = document.getElementById("feedback");
feedback.addEventListener("input", () => {
  counter.textContent = `character counter: ${feedback.value.length}`;
});

// get rid of counter when the user is no longer focused on it
feedback.addEventListener("blur", () => {
  counter.textContent = "";
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
