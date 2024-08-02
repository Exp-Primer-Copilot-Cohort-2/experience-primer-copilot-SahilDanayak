// Create web server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

// Read comments from comments.json
let comments = JSON.parse(fs.readFileSync('comments.json'));

app.use(bodyParser.json());
app.use(express.static('public'));

// Get comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Post comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(newComment);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});