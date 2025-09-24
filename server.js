const express = require('express');
const path = require('path');

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

//__dirname is a special variable in Node.
//It always contains the absolute path of the folder where the current JS file lives.

app.get('/ZEN',(req, res) => {
  res.sendFile(path.join(__dirname, 'src/Zindex.html'));
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