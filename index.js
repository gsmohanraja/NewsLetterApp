const express = require('express');
const mongoose = require('mongoose');
const { publishMessage } = require('./emailWorker')

const { json, urlencoded } = express;
const app = express();
app.use(json());

mongoose.connect("mongodb://localhost:27017/newsLetter", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Welcome to our API'
  })
});

app.post('/newsLetter', (req, res) => {


  const {  email, content, subject } = req;
  const emailOptions = {
    mail: content,
    subject: subject,
    to: email
  }
  // call rabbitmq service to app mail to queue
  publishMessage(emailOptions);
  return res.status(202).send({
    message: 'Email sent successfully'
  })
});

app.listen(5000, () => {
  console.log(`app running on port: 5000`);
});