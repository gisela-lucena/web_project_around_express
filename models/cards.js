import mongoose from 'mongoose';
const urlRegex = /^(https?:\/\/)(www\.)?[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    match: urlRegex,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
},
likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
createdAt: {
    type: Date,
    default: Date.now,
}
});

export const Card = mongoose.model('card', cardSchema);
