import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createComment,
  getPostComment,
} from '../controllers/comment.contrller.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getpostcomment/:postId', getPostComment);

export default router;
