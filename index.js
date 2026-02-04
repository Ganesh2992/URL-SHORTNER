import 'dotenv/config';
import express from 'express';
import {authenticationMiddleware} from './middlewares/auth.middleware.js';
import urlRouter from './routes/url.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();


app.use(express.json());
app.use(authenticationMiddleware);

const PORT = process.env.PORT ?? 8000;


app.use('/user',userRouter);
app.use(urlRouter);

app.get('/',(req,res)=>{
  return res.status(200).json({status: `Server is up and running`});
});

app.listen(PORT,()=>{
  console.log(`HTTP server is running on the PORT ${PORT}`);
});