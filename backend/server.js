const express = require('express');
const dotenv = require('dotenv').config();    
const connectToDb = require("./config/connectionDb")
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

connectToDb()
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Foddiee API!' });
});
app.use('/recipe', require('./routes/recipe'));

app.listen(PORT, (err) => {
  console.log(`Server is running on port ${PORT}`);
});

