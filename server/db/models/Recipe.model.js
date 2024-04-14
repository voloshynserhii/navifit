const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecipeSchema = new Schema(
  {
    name: { type: String, trim: true },
    calories: { type: Number },
    cookingTime: { type: Number },
    proteins: { type: String, trim: true },
    carbs: { type: String, trim: true },
    fats: { type: String, trim: true },
    ingredients: [{ type: Object }],
    description: { type: String, trim: true },
    recipeId: { type: Number },
    cookingTimeId: { type: Number },
    essentialIngredientIds: [{ type: String, trim: true }],
    mainImage: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    videos: [{ type: String, trim: true }],
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', RecipeSchema)
