require('dotenv').config()
const { urlencoded } = require('express');
const express=require("express");
const path=require("path")
const app =express()
require("./db/conn");
const port =process.env.port;
const PracticeS=require("./models/practice")
app.use(express.json())



app.get("/register",(req,res)=>{
  res.sendFile("index.html")
})

//user register 
app.post("/register",async(req,res)=>{
  // console.log(req.body)


  const Register= new PracticeS(req.body);

  PracticeS.findOne({email:Register.email}).then((resp)=>{

    if(resp){

    res.send("email already exist")

    }
    else{

      Register.save().then((resp)=>{

        console.log(`data saved ${resp}`)
        res.send(Register);
      }).catch((err)=>{
    
        console.log(`error occured ${err}`)
      })


    }

  })
  
})





//check if password and email same

app.post("/login",(req,res)=>{

  //check confirm password match or not 
  //fetch password form server 
  //const compare=req.body.cpassword
  

  // if(compare==req.body.password){

   

  //   //redirect the user 



  // }
  // else{

    
    

  //   //find email present in databse 
  // }

//test api tthough postmon access the data --------------------->

  PracticeS.findOne({email:req.body.email,password:req.body.password}).then((resp)=>{
    if(resp){
      res.send("user found ")
    }
    else{
      res.send("user not found ")
    }

  }).catch((err)=>{
    console.log("something went wrong ",err)
  })

})

//fetch all the users 
app.get("/",(req,res)=>{
  PracticeS.find({status:true}).then((resp)=>{

    if (resp){
      console.log(resp)
      res.send(resp)
    }
    else{
      console.log("no data found")
    }
  }).catch((err)=>{

    console.log("something went bad",err)
  })




})



//delete the user
app.get("/delete/:id",(req,res)=>{

  PracticeS.findByIdAndRemove(req.params.id).then((resp)=>{

    if(resp){

      console.log("user deleted")
      res.send("deleted sucessfully")


    }
    else{
      console.log("no user found")
      res.send("no user found with ")

    }

  }).catch((err)=>{

    console.log("something went wrong ",err)
    res.send("something went wrong ")


  })

})




//update the details
app.patch("/update/:id",async (req,res)=>{
  try{

    const Check =await PracticeS.findById(req.params.id)

 if(Check)
 {
  const data =req.body
  const Updatedata=await PracticeS.findByIdAndUpdate(req.params.id,data,{new: true})
  res.send(Updatedata)
  console.log(Updatedata)
 }
 else{
  res.send("data not found")
  console.log("data not found ")
 }
  }
  catch(err){

    res.send(err)
    console.log("server error ")
    console.log(err)


  }


})

  
  app.listen(port, () => {
    console.log(`Server started on  http://localhost:${port}`)
  })


  ///---------------------------------------------------------------------------------------