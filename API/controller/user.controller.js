import "../model/connection.js";
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import UserSchemaModel from '../model/user.model.js';
import bcrypt from 'bcryptjs'
import senMail from "./email.controller.js";


export const save =async (req,res)=>{
  console.log(req.body);
    // For dynamic id increment
    var userList = await UserSchemaModel.find();// find all users
    var l = userList.length;    
    var _id = l==0?1:userList[l-1]._id+1; // increment id if list is not empty and userList[l-1] returns a id value,after that id increment by 1
    const userDetails = {...req.body,"_id":_id,"status":1,"role":"user","info":Date()};
    const password = userDetails.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    userDetails.password = hashedPassword;
    // console.log(userDetails)
     try{
        await UserSchemaModel.create(userDetails)
        senMail(userDetails.email,password); // Send original password in email
        res.status(200).json({"status":true});
     }
     catch (error){
      console.log(error);
           res.status(500).json({"status":false});
     }
}

export const login = async (req,res)=>{
    const condition_obj = {email: req.body.email, status: 1};
    
    console.log(req.body);
    var userList = await UserSchemaModel.find(condition_obj);
    
    if(userList.length != 0){
        // Compare password with hashed password
        const isMatch = await bcrypt.compare(req.body.password, userList[0].password);
        
        if(isMatch){
            const playload = userList[0].email;// get email from user list
            const key = rs.generate(50); // generate random key
            const token = jwt.sign(playload,key); // sign token with key
            res.status(200).json({"token":token,"userdetails":userList[0]}); // token and user details
        } else {
            res.status(401).json({"message": "Invalid credentials"});
        }
    }
    else {
        res.status(401).json({"message": "Invalid credentials"});
    }
}

export const fetch = async (req,res)=>{
  var condition_obj= req.query.condition_obj;
   var userList = await UserSchemaModel.find(condition_obj);// if the id not found it will return an empty array
   if (userList.length!=0)
   res.status(200).json(userList)
   else
   res.status(404).json("Resource not found ")


}

export const updateData =async(req,res)=>{
 
let userDetails =await UserSchemaModel.findOne(req.body.condition_obj);
if(userDetails){
  let user=await UserSchemaModel.updateOne((req.body.condition_obj),{$set: req.body.content_obj});  
  if(user)
    res.status(200).json("Success");
  else
  res.status(500).json("Server error");
} 
else
res.status(404).json({"status":"Resource is not found "})
}



export const deleteUser = async (req,res)=>{
  let uDetails = await UserSchemaModel.findOne((req.body));
  
  if(uDetails)
  {
    let user = await UserSchemaModel.deleteOne((req.body));
    if(user)
      res.status(200).json("success");
    else
    res.status(500).json("Server error");
  }
  else
  res.status(404).json("Resource is not found");
  
}