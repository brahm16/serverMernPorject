import express from 'express';
import {getFeedPosts,getUserPosts,likePost } from '../controllers/post.js';
import { verifyToken } from '../middleware/auth.js';

const router=express.Router();

router.get('/',verifyToken,getFeedPosts);
router.get('/:id/posts',verifyToken,getUserPosts);
router.patch('/:idUser/:idPost',verifyToken,likePost);



export default router;
