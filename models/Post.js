import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  date: { type: Date, default: Date.now }
});

// const Post = model('Post', postSchema);

export default model('Post', postSchema);
