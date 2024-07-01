const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CustomerRouter = require('./router/customerrouter');

dotenv.config();

// Suppress deprecated 'strictQuery' warning
mongoose.set('strictQuery', false);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/customer', CustomerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
