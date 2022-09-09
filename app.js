const express=require('express')
const router=require('./router')

const app=express()
app.use(express.json())

require('./conn')
// app.post("/",(req,res)=>{
    
// res.send('hello')

// })
app.use(router)

app.listen(7000,()=>
{
    console.log('listening to  7000')

})