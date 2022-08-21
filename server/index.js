const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectToDB } = require("./config/db");
const connectDB = require("./config/db");
connectDB();

const port = process.env.PORT || 5051;

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./index.routes'));

app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
