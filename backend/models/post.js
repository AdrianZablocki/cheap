import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Please add author']
  },
  date: {
    type: Date
  },
  name: {
    type: String,
    required: [true, 'Please add title']
  },
  price: {
    type: Number,
    required: [true, 'Please add price']
  }
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);
