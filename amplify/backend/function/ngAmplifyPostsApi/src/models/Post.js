const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const PostSchema = new mongoose.Schema({
  _id: {type: String, required: true, default: uuid()}, // UUID() is mongo and generate a BSON UUID object
  title: { type: String, required: true },
  body: String,
  slug: {type: String, required: true}
}, {
  timestamps: true
});

PostSchema.virtual('caption').get(function () {
  return  `${this.body.toString().substring(0, 10)}`
})


module.exports = mongoose.model(
  "Post",
  PostSchema
)
