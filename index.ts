import express from 'express';
import cors from 'cors';
import router from './src/router';
import { errors } from 'celebrate';

const PORT = process.env.PORT || 3333
const app = express();

app
  .use(cors())
  .use(express.json())
  .use(errors())
  .use(router)

  .use((error:any, req:express.Request, res:express.Response, next:express.NextFunction)=>{
    res.status(error.status || 500);
    res.json({ error: error.message });
  })

  .listen(PORT, ()=>console.log(`Running on PORT ${PORT}`));
