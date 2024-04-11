const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PromocodeSchema = new Schema(
  {
    code: { type: String, trim: true },
    type: {
      type: String,
      trim: true,
      enum: ['0', '1'],
      default: '0'
    },
    email: { type: String, trim: true },
    discount: { type: String, trim: true },
    dateDue: { type: Date },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Promocode', PromocodeSchema)
