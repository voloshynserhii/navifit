const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlanSchema = new Schema(
  {
    title: { type: String, trim: true },
    price: { type: String, trim: true },
    promoPrice: { type: String, trim: true },
    duration: { type: String, trim: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Plan', PlanSchema)
