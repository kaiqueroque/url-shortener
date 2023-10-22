require('dotenv').config();
const express = require('express');
const cors = require("cors")
const database = require('./db/db');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(cors());

const shortenRoutes = require('./routes/shortenRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/', shortenRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Olá Express!' });
});

(async () => {
  try {
    await database.sync();
  }catch(err) {
    console.log("Erro ao sincronizar com banco de dados");
  }
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3000,
});