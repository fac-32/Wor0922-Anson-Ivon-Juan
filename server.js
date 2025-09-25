const express = require('express');
const path = require('path');
//const fetch = require("node-fetch");

//Imports Node’s built-in path module.
//path helps you work with file and directory paths safely across operating systems.
//Example: combining folder names, resolving absolute paths, avoiding issues with Windows vs Mac/Linux slashes.

const app = express();
const PORT = process.env.PORT || 3000;

//app is now your server object.
//You’ll use app to define routes, middleware, and start the server.
//Think of app as the main engine of your server.

//Sets the port the server listens on.
//process.env.PORT → If you deploy to a cloud service, it might assign a port automatically.
//|| 3000 → If there’s no environment variable, it defaults to port 3000.

// Serve everything inside your project folder (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

app.get('/anson-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/anson-page.html'));
})

app.get('/anson-page/capy-btn', async (req, res) => {
    try {
        const response = await fetch("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQhgLbMsmN8e5xdiuUkPylNLeMPrRy2UeVJo10RZ8PQLrggEpHUOih6ZMXPBFtUFPaUTum8jovHHd_GSqeGtZJWtxCqjTehPw-kgfgri_I");
        const buffer = await response.arrayBuffer();
        
        res.set("Content-Type", "image/jpeg");
        res.send(Buffer.from(buffer));
    } catch (err) {
        res.send(err);
    }
    
    // res.send('click');
})
// Serve static files from src/ (CSS, client JS, images, html)
//app.use(express.static(path.join(__dirname, 'src')));

//__dirname is a special variable in Node.
//It always contains the absolute path of the folder where the current JS file lives.

app.get('/ZEN',(req, res) => {
  res.sendFile(path.join(__dirname, 'src/Zindex.html'));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let APIResult = [];
let qIndex = 0;
let scoreCount = 0;

async function getQuiz() {
  try {
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=boolean");
    const data = await res.json();
    APIResult = data.results;
  } catch (err) {
    console.error("Error fetching quiz:", err);
  }

}

app.get('/reset', async (req, res) => {  
  scoreCount = 0;
  qIndex = 0;
});

app.get('/quiz', async (req, res) => {  
  if (APIResult.length === 0) await getQuiz();
  res.json(APIResult[qIndex]);
});

app.post('/answer', (req, res) => 
  {
    const correct = APIResult[qIndex].correct_answer;
    const answer = req.body.answer;
    let result;
    let endMessage = "";

    if(qIndex === APIResult.length - 1)
    {
        switch (true)
        {
          case scoreCount < 2:
            endMessage = "END: there is no hope 🤬";  
            break;
          case scoreCount < 3:
            endMessage = "END: you cant be that bad 😐";
            break;
          case scoreCount < 4:
            endMessage = "END: well done now we talking 😮";
            break;
          case scoreCount < 6:
            endMessage = "END: absolutely fabulous 🥵";
            break;       
          default:
            endMessage = "END: ok";  
        }
    }

    if(answer == correct) 
      {
        scoreCount++;
        result = {answer: true, message: "CORRECT", score: scoreCount, quizEndMessage: endMessage};
      }
        
    else result = {answer: false, message: "WRONG", score: scoreCount, quizEndMessage: endMessage};



    res.json(result);

  });

  app.post('/next', (req, res) => 
  {
    qIndex = (qIndex + 1) % APIResult.length;

    res.json(APIResult[qIndex]);
  });

  function isItLastQuestion()
  {
    return qIndex === APIResult.length;
  }



// Middleware: simple login check
app.post('/login', (req, res) => {
  let name = req.body.name;
  let password = req.body.password;

  if (name === 'zen' && password === '111') {
    res.send('✅ Login successful! Welcome ' + name); 
  } else {
    return res.status(401).send('Invalid username or password');
  }
});



app.get("/rafi", (req, res) => {
  res.sendFile(path.join(__dirname, 'src/rafi.html'));
});

//Only runs if the request is:
//Method: GET
//Path: /ZEN
//👉 This is for specific routes you want to define, like /about, /contact, /products, etc.

//app.use(handler)
//Runs for all HTTP methods (GET, POST, etc.).
//Runs for all paths unless you specify one.
//This has no path, so it matches everything that hasn’t already been handled.
//That’s why it’s called a fallback / catch-all.
//👉 This is useful for:
//Middleware (code that runs before routes, like logging or authentication).
//Catch-all routes (like “if nothing else matched, send index.html”).

// Fallback: send index.html if route not found (useful if you later add client-side routing)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

//This is a fallback route.
//app.use() without a path matches all requests that haven’t been handled yet.
//res.sendFile() sends a file to the client.
//Why we use it:
//If a user navigates to /about or /quiz.html, this ensures the browser gets your main HTML page.
//This is important for single-page applications (SPA) where routing is handled on the client side.
//path.join(__dirname, 'src/index.html'):
//Combines your current folder path with src/index.html.
//Ensures it works on all operating systems.


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//Starts the server and tells it to listen on the port you defined.
//The callback runs once the server starts successfully.
//console.log() prints a message so you know your server is running.
//you will see the log in the command prompt