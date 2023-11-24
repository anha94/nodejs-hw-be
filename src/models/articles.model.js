const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  keyword: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
