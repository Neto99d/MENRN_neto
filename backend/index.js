// server/index.js
import authRoutes from './auth/auth.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/reactID';
mongoose
  .connect(mongoDB, {useNewUrlParser: true})
  .then(() => console.log('CONECTADO A DB'))
  .catch(e => console.log('ERROR CONECTAR A DB'));

var corsOptions = {
  origin: 'http://localhost:3001',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authRoutes);

/*app.get('/api', (req, res) => {
  res.json({message: 'Hola desde el servidor!'});
});*/
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
