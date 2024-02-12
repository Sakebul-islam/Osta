import mongoose, { Schema } from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true },
    image: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    category: { type: String, default: 'uncategorized' },
    slug: { type: String, required: true, unique: true },
  },
  { timeStamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
