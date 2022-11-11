const mongoose = require("mongoose");
let categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  bookId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  }],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;