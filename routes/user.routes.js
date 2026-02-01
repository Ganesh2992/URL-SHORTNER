import express from 'express';
import { signupPostRequestBodySchema } from '../validation/request.validation.js';
import {hashedPasswordWithSalt} from '../utils/hash.js';
import {getUserByEmail,createUser} from '../services/user.service.js';

const router = express.Router();

router.post('/signup',async(req,res)=>{
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

  if(validationResult.error){
    return res.status(400).json({error: validationResult.error.format()});
  }
  const {firstName,lastName,email,password} = validationResult.data;


  const existingUser = await getUserByEmail(email);

  if(existingUser){
    return res.status(400).json({error: `User with email ${email} already exists`});
  }

  const {salt,password:hashedPassword} =  hashedPasswordWithSalt(password)

  const user = await createUser({
    email,
    firstName,
    lastName,
    salt,
    password: hashedPassword,
  });

  return res.status(201).json({data:{userId: user.id}});
})
export default router;