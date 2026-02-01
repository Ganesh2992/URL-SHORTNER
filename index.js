import express from 'express';
import userRouter from './routes/user.routes.js';

const app = express();
app.use(express.json());

app.use('/user',userRouter);

const PORT = process.env.PORT ?? 8000;

app.get('/',(req,res)=>{
  return res.status(200).json({status: `Server is up and running`});
})

app.listen(PORT,()=>{
  console.log(`HTTP server is running on the PORT ${PORT}`);
})