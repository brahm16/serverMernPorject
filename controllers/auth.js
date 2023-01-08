import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register =async(req,res)=>{
    try{
const{
firstName,
lastName,
email,
password,
picturePath,
friends,
location,
occupation,
}=req.body;
const salt=await bcrypt.genSalt();
const passwordHash=await bcrypt.hash(password,salt);
const newUser=new User({
firstName,
lastName,
email,
passwordHash,
picturePath,
friends,
location,
occupation,
nbrOfViews:Math.floor(Math.random()*10000),
impression:Math.floor(Math.random()*10000),
});
const savedUser=newUser.save();
res.status(201).json(savedUser);
    }
    catch(err){
res.status(500).json({error: err.message});
    }
}

export const loggin= async (req,res)=>{
    try{
 const {email,password} =req.body;
 const user=User.findOne({email:email});
 if(!user) return res.status(400).json({msg: 'User Not found'});
 const isMatch=bcrypt.compare(password,user.password);
 if(!isMatch) return res.status(400).json({msg: 'Password Incorrect'});
 const token=jwt.sign({id: user._id},process.env.JWT_SECRET);
 delete user.password;
 res.status(200).json({token,user});

    }
    catch(err){
        res.status(500).json({error: err.message});
    }

}