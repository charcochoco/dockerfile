const mongoose = require("mongoose");
const User = require('./User');

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ['PROCESSED', 'CANCELED'],
        required: true,
        default: 'PROCESSED',
      },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        schema: User
    }
  },
  { timestamps: true }
);
Schema.methods.toJSON = function () {
  return {
    _id: this._id,
    name: this.name,
    image: this.image,
    price: this.price,
    status: this.status,
    userId: this.userId,
  };
};

module.exports = mongoose.model("Order", Schema);