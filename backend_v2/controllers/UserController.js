import user from "../models/User.js";
import bcrypt from 'bcrypt';
export const checkuser = async(req, res) => {
  try{
     const {email, password} = req.body;
     const check = await user.findOne({email: email});
     
     if(check && check.password === password){
        res.status(201).json({ success: true, message: "welcome"})
  }
     else{
        res.status(500).json({ success: false, message: "wrong email or password"})
  }
  }
  catch(err){
     res.status(500).json({ success: false, message: err.message });
  }
}

export const adduser = async(req, res) => {
   try{
     const {email, password} = req.body;
     const adduser = new user({
      email: email,
      password: password
     });
     await adduser.save();
     if(adduser){
      res.status(201).json({ success: true, message: "Welcome"});
     }
     else{
      res.status(500).json({ success: false, message: "something went wrong"})
     }
   }
   catch(err){
    res.status(500).json({ success: false, message: err.message });     
   }
}