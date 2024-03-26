const Functions = require('./Functions')
const db = require('../db')

const generatePlan = async ({ personalDailyKCalNeeded, vegetables, grains, desired, meat }) => {
    try {
        const desiredVegetables = ingredients.vegetables.filter(vegetable => Object.keys(vegetables).includes(vegetable.value))
        const desiredGrains = ingredients.grains.filter(grain => Object.keys(grains).includes(grain.value))
        const desiredProducts = ingredients.desiredProducts.filter(product => Object.keys(desired).includes(product.value))
        const desiredMeat = ingredients.meat.filter(m => Object.keys(meat).includes(m.value))
        
        const ids = [...desiredVegetables, ...desiredGrains, ...desiredProducts, ...desiredMeat].map(ingredient => ingredient.id)
        
        const query = {
            $and: [{
                $or: [
                    { essentialIngredientIds: { $in: ids } },
                    { 'essentialIngredientIds.0': { $exists: false } }
                ]
            }]
        }
        
        const calories = +personalDailyKCalNeeded

        let breakfasts = await db.recipe.find({ ...query, calories: { $gt: calories * 0.2, $lt: calories * 0.35 } }).limit(28).lean().exec()
        
        if (breakfasts.length < 28) {
            breakfasts = [...breakfasts, ...await db.recipe.find({ calories: { $gt: calories * 0.2, $lt: calories * 0.35 } }).limit(28 - breakfasts.length).lean().exec()]
        }
        
        let branches = await db.recipe.find({ ...query, calories: { $gt: calories * 0.1, $lt: calories * 0.2 } }).limit(28).lean().exec()
        
        if (branches.length < 28) {
            branches = [...branches, ...await db.recipe.find({ calories: { $gt: calories * 0.1, $lt: calories * 0.2 } }).limit(28 - branches.length).lean().exec()]
        }
        
        let lunches = await db.recipe.find({ ...query, calories: { $gt: calories * 0.2, $lt: calories * 0.3 }, _id: { $nin: [...breakfasts, ...branches].map(br => br._id) } }).limit(28).lean().exec()
        
        if (lunches.length < 28) {
            lunches = [...lunches, ...await db.recipe.find({ calories: { $gt: calories * 0.2, $lt: calories * 0.3 }, _id: { $nin: [...breakfasts, ...branches].map(br => br._id) } }).limit(28 - lunches.length).lean().exec()]
        }
        
        let dinners = await db.recipe.find({ ...query, calories: { $gt: calories * 0.2, $lt: calories * 0.3 }, _id: { $nin: [...breakfasts, ...branches, ...lunches].map(br => br._id) } }).limit(28).lean().exec()
        
        if (dinners.length < 28) {
            dinners = [ ...dinners, ...await db.recipe.find({ calories: { $gt: calories * 0.2, $lt: calories * 0.3 }, _id: { $nin: [...breakfasts, ...branches, ...lunches].map(br => br._id) } }).limit(28 - dinners.length).lean().exec()]
        }
        
        console.log('breakfasts', breakfasts.length)
        console.log('branches', branches.length)
        console.log('lunches', lunches.length)
        console.log('dinners', dinners.length)
        const month = {
            week1: [],
            week2: [],
            week3: [],
            week4: [],
        }
    
        breakfasts.forEach((breakfast, i) => {
            let day = {}
            day.breakfast = breakfast
            day.branch = branches[i]
            day.lunch = lunches[i]
            day.dinner = dinners[i]
    
            if (month.week1.length < 7) {
                month.week1.push(day)
            } else if (month.week2.length < 7) {
                month.week2.push(day)
            } else if (month.week3.length < 7) {
                month.week3.push(day)
            } else {
                month.week4.push(day)
            }
        })
    
        return month
    } catch (err) {
        console.log(err)
    }
}

const ingredients = {
    vegetables: [
        {
            title: 'broccoli',
            value: '1',
            id: '1'
        },
        {
            title: 'cauliflower',
            value: '2',
            id: '2'
        },
        {
            title: 'asparagus',
            value: '3',
            id: '6'
        },
        {
            title: 'bellPepper',
            value: '4',
            id: '3'
        },
        {
            title: 'eggplant',
            value: '4',
            id: '4'
        },
        {
            title: 'cabbage',
            value: '5',
            id: '5'
        },
        {
            title: 'spinach',
            value: '7',
            id: '7'
        },
        {
            title: 'onion',
            value: '8',
            id: '8'
        },
    ],
    grains: [
        {
            title: 'rice',
            value: '1',
            id: '9'
        },
        {
            title: 'quinoa',
            value: '2',
            id: '10'
        },
        {
            title: 'couscous',
            value: '3',
            gluten: true,
            id: '11'
        },
        {
            title: 'buckwheat',
            value: '4',
            id: '12'
        },
        {
            title: 'amaranth',
            value: '5',
            id: '13'
        },
        {
            title: 'cornmeal',
            value: '6',
            id: '14'
        },
        {
            title: 'milletGroats',
            value: '7',
            id: '15'
        },
        {
            title: 'bulgur',
            value: '8',
            gluten: true,
            id: '16'
        },
        {
            title: 'semolina',
            value: '9',
            id: '17'
        },
    ],
    desiredProducts: [
        {
            title: 'avocado',
            value: '1',
            id: '18'
        },
        {
            title: 'peas',
            value: '2',
            id: '19'
        },
        {
            title: 'mushrooms',
            value: '3',
            id: '20'
        },
        {
            title: 'milk',
            value: '4',
            lactose: true,
            nonVegan: true,
            id: '22'
        },
        {
            title: 'hummus',
            value: '5',
            id: '24'
        },
        {
            title: 'plantMilk',
            value: '6',
            id: '25'
        },
        {
            title: 'eggs',
            value: '7',
            nonVegan: true,
            id: '21'
        },
        {
            title: 'cottageCheese',
            value: '8',
            lactose: true,
            nonVegan: true,
            id: '23'
        },
    ],
    meat: [
        {
            title: 'turkey',
            value: '1',
            nonVegetarian: true,
            nonVegan: true,
            id: '26'
        },
        {
            title: 'beef',
            value: '2',
            nonVegetarian: true,
            nonVegan: true,
            id: '27'
        },
        {
            title: 'chicken',
            value: '3',
            nonVegetarian: true,
            nonVegan: true,
            id: '28'
        },
        {
            title: 'pork',
            value: '4',
            nonVegetarian: true,
            nonVegan: true,
            id: '29'
        },
        {
            title: 'fish',
            value: '5',
            nonVegan: true,
            id: '30'
        },
        {
            title: 'seafood',
            value: '6',
            nonVegan: true,
            id: '31'
        },
    ]
}

module.exports = {
    ingredients,
    generatePlan
}