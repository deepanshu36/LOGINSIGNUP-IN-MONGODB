const express=require('express');
const User = require('./models');
const router=new express.Router()
const bcrypt=require('bcrypt')
const JWT=require('jsonwebtoken')
const validate=require('validator')

router.post('/signup',async(req,res)=>
{
 const a=  await User.find({email:req.body.email})

   if(a[0])
   {
    return res.send('user with this email allready exists')
   }
   else 
   if(!validate.isEmail(req.body.email))
   {
      return res.send('wrong email id')
   }
   else 
   {
   try
   {
    const user=new User(req.body)
   const result=await user.save()

  const token =await JWT.sign({result},"123324fdscvwef124acaef133141cw")
    res.send(token)

   }
   catch(e)
   {
    throw(e)

   }
  
}

})

router.post('/login',async(req,res)=>
{

    const a=await User.find({email:req.body.email})

    if(!a[0])
    return res.send('user name not found')

   try{
    const mail=await User.find({email:req.body.email})
    // console.log(mail[0].password)

    console.log(mail[0].password,req.body.password)

    const check =  await bcrypt.compare(req.body.password,mail[0].password)

    if(check)
    {
        return res.send('user found')
    }
    else
    {
        return res.send('invalid password')
    }
   }
   catch(e)
   {
    res.send(e)
   }


})







module.exports=router