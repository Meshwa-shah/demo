import user from "../models/User.js";

export const checkuser = async(req, res) => {
  try{
     const {email, password} = req.body;
     const check = await user.findOne({email: email});
     if(check && check.password === password){
        res.status(201).json({ success: false, message: "welcome"})
  }
     else{
        res.status(500).json({ success: false, message: "wrong email or password"})
  }
  }
  catch(err){
     res.status(500).json({ success: false, message: err.message });
  }
}