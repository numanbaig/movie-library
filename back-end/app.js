require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const { movieRouter } = require('./routes/movies');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = '3001'
const BASE_URL = '/api'

app.use(`${BASE_URL}/movies`, movieRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
