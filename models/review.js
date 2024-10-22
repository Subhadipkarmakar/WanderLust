const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

