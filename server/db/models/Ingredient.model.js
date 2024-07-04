const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientSchema = new Schema(
  {
    title: { type: String, trim: true },
    unit: { type: String, trim: true },
    value: { type: String, trim: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Ingredient', IngredientSchema)