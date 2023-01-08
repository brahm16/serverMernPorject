import User from "../models/user.js";


export const getUser=async (req,res)=>{
try{
const {id} = req.params;
const user=await User.findById(id);
res.status(200).json(200);
}
catch(err){
    res.status(404).json({message: err.message})
}
}

export const getUserFriends=async(req,res)=>{
    try{
     const {id}=req.params;
     const user= await User.findById(id);
     const friends =await Promise.all(
        user.friends.map((friend)=>User.findById(friend))
     );
     const formattedFriends=friends.map(({_id,firstName,lastName,occupation,location,picturePath})=>{
        return {_id,firstName,lastName,occupation,location,picturePath}
     });
     return res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}

export const addRemoveFriend= async (req,res)=>{
    try{
        const {id,idfriend} =req.params;
        const user= await User.findById(id);
        const friend= await User.findById(idfriend);
        if(user.friends.includes(idfriend)){
            user.friends= user.friends.filter((x)=>x!==idfriend);
            friend.friends= friend.friends.filter((x)=>x!==id);
        }
        else{
            user.friends.push(idfriend);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        return res.status(200).json({message : 'added successfully'});

    }
    catch(err){
        res.status(404).json({message: err.message})

    }
}
