import express from 'express';
import cors from 'cors';
import router from './src/router';

const app = express();

app
  .use(cors())
  .use(router)

  .listen(3333, ()=>console.log('Runngin on port 3333'));