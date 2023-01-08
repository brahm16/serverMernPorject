import express from 'express';
import Post from '../models/post.js';
import User from '../models/user.js';

export const createPost=async (req,res)=>{
    try{
        const {userId, description,picturePath}=req.body;
        const user=await User.findById(userId);
        const post=new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            picturePath,
            userPicturePath:user.picturePath,
            likes:{},
            comments:[]
        });
        await post.save();
        const allPosts= await Post.find();
        return res.status(201).json(allPosts);
    }
    catch(err){
    res.status(404).json({message:err.message})
    }


}

export const getFeedPosts=async (req,res)=>{
    try{
     const post=await Post.find();
     res.status(200).json(post);
    }
    catch(err)
    {
      res.status(400).json({message:err.message});
    }
}

export const getUserPosts= async (req,res)=>{
    try{
    const {userId} =req.params;
    const posts=Post.find({userId});
    res.status(200).json(posts);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}
export  const likePost=async (req,res)=>{
    try{
        const {idUser,idPost} =req.params;
        const user=await User.findById(idUser);
        const post=await Post.findById(idPost);
        const isLiked=post.likes.get(idUser);
        isLiked ? post.likes=post.likes.delete(idUser) : post.likes.set(idUser,true);
        const updatePost=await Post.findByIdAndUpdate(idPost,{likes:post.likes},{new : true});
        res.status(200).json(updatePost);

    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}