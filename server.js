const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve everything inside your project folder (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

app.get("/rafi", (req, res) => {
  res.sendFile(path.join(__dirname, "src/rafi.html"));
});

// Fallback: send index.html if route not found (useful if you later add client-side routing)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});