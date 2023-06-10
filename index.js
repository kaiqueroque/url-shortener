require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

const shortenRoutes = require('./routes/shortenRoutes');
app.use('/', shortenRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'oi Express!' });
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@url-shortener.vzo4pe0.mongodb.net/bancodaapi?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Conectamos ao MongoDB!');
    // app.listen(port) //Não funcionou com esse comando inserido.
  })
  .catch((err) => {console.log(err)})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});