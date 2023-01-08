import express from "express";
import { loggin } from "../controllers/auth.js";


const router=express.Router();

router.post('/login',loggin);

export default router;
