const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')


const schema=mongoose.Schema({
     name:{
        required:true,
        type:String,
        minLength:6
     },
     email:{
            unique:true,
             required:true,
             type:String,
             validate(value)
             {
                if(!validator.isEmail(value))
                {
                    throw new Error ("wrong email")
                }
             }

     },
     password:
     {
       type:String,
       required:true,
       minLength:6
     }

}
)

schema.pre("save",async function(next){

   console.log(this.password) 
   this.password=await bcrypt.hash(this.password,10)


next()

})
 
const User=new mongoose.model('userlogin',schema)

module.exports=User
