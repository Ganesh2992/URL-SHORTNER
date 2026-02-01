import express from 'express';
import { signupPostRequestBodySchema,loginPostRequestBodySchema} from '../validation/request.validation.js';
import {hashedPasswordWithSalt} from '../utils/hash.js';
import {getUserByEmail,createUser} from '../services/user.service.js';
import {createUserToken} from '../utils/token.js';

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
});

router.post('/login',async(req,res)=>{
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);

  if(validationResult.error){
    return res.status(400).json({error: validationResult});
  }

  const {email,password} =validationResult.data;

  const user = await getUserByEmail(email);

  if(!user){
    return res.status(404).json({error : `User with eamil ${email} does not exist`});
  }

  const {password: hashedPassword} = hashedPasswordWithSalt(password,user.salt);

  if(user.password!==hashedPassword){
    res.status(400).json({error: 'Invalid Password'});
  }
  const token = await createUserToken({id:user.id});

  return res.json({token});
})
export default router;