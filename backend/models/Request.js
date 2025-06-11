// const requestSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   items: [
//     {
//       name: String,
//       category: String,
//       quantity: Number,
//       cost: Number
//     }
//   ],
//   reason: String,
//   status: {
//     type: String,
//     default: "Pending"
//   }
// }, { timestamps: true });
/////////////
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  item: String,
  quantity: Number,
  reason: String,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);
