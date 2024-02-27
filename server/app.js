const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const config = require('./config')

//create recipes from file
// const db = require('./db')
// const XLSX = require('xlsx')
// const workbook = XLSX.readFile('assets/plans.xlsx')
// const sheet_name_list = workbook.SheetNames
// const output = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

// for (const recipe of output) {
//   const ingredients = []
//   const ingredientsNames = recipe['Essential ingredients Name'].split('\n')
//   const ingredientsWeight = recipe['Essential ingredients Mass'].split('\n')
  
//   ingredientsNames.forEach((ingredient, index) => {
//     ingredients.push({ [ingredient]: ingredientsWeight[index] })
//   })

//   let essentialIngredientIds = recipe['Ingredients ID merged']?.toString()

//   if (essentialIngredientIds?.search(',') < 0) {
//     essentialIngredientIds = essentialIngredientIds.split('.')
//   } else {
//     essentialIngredientIds = essentialIngredientIds?.split(',')
//   }
//   const data = {
//     name: recipe['Name'],
//     calories: recipe['Calories (cal)'],
//     cookingTime: recipe['CookingTime (min)'],
//     proteins: recipe['Proteins'],
//     carbs: recipe['Carbs'],
//     fats: recipe['Fats'],
//     ingredients,
//     essentialIngredientIds,
//     description: recipe['Cooking'],
//     recipeId: recipe['Recipe ID'],
//     cookingTimeId: recipe['Cooking Time ID'],
//     essentialIngredientIds,
//   }

//   const newRecipe = new db.recipe(data)
//   newRecipe.save().then(() => console.log('Recipe saved', newRecipe.name)).catch(err => console.log('Error saving', newRecipe.name))
// }

/**
 * Check config
 */
if (!config.server.port || !config.server.env) {
  console.error('[FAILED] No configs for Server')
  process.exit(-1)
}

const routes = require('./routes')
// const Session = require('./util/Session')
/**
 * Init Express
 */
const app = express()

/**
 * Init Helmet
 */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          'cdnjs.cloudflare.com',
          'maxcdn.bootstrapcdn.com',
          'maps.googleapis.com',
          'www.googletagmanager.com',
          'https://catamphetamine.github.io/read-excel-file/read-excel-file.min.js',
          'static.zdassets.com',
          'www.google-analytics.com',
          'widget-mediator.zopim.com',
          '*.tinymce.com',
          '*.tiny.cloud',
          'https://d2yyd1h5u9mauk.cloudfront.net/integrations/web/v1/library/WT7m87tOVXHtDfku/delighted.js',
          '*.vimeo.com',
          '*.vimeocdn.com',
        ],
        'style-src': [
          "'self'",
          "https: 'unsafe-inline'",
          'blob:',
          'data:',
          '*.tinymce.com',
           '*.tiny.cloud'
        ],
        'connect-src': [
          "'self'",
          'wss:',
          'web.delighted.com',
          'ekr.zdassets.com',
          'regdesksupport.zendesk.com',
          'www.google-analytics.com',
          'widget-mediator.zopim.com',
          'fcm.googleapis.com',
          'maps.googleapis.com',
          'stats.g.doubleclick.net',
          '*.tinymce.com',
          '*.tiny.cloud',
          'blob:',
          '*.vimeo.com',
          '*.vimeocdn.com',
        ],
        'img-src': [
          "'self'",
          'data:',
          'https:',
          '*.tinymce.com',
          '*.tiny.cloud',
          'blob:',
          /*
          "www.google.com",
          "www.google.ru",
          "www.google-analytics.com",
          "cdnjs.cloudflare.com",
          */
        ],
        'font-src': [
          "'self'",
          'data:',
          'maxcdn.bootstrapcdn.com',
          '*.tinymce.com',
          '*.tiny.cloud',
        ],
        'media-src': ["'self'", 'data:', 'static.zdassets.com'],
        'frame-src': ["'self'", 'blob:', '*.vimeo.com', '*.vimeocdn.com'],
        'script-src-attr': "'unsafe-inline'",
      },
    },
  })
)

/**
 * Add functions for send the code error in response
 */
// app.use(ErrorList.addFunctionsResponse)

/**
 * Parse URL
 */
app.use(
  bodyParser.urlencoded({
    limit: '16mb',
    extended: false,
  })
)

/**
 * Parse request body for application/json
 */
app.use(
  '*',
  bodyParser.json({ limit: '16Mb', })
)

/**
 * Init logger
 */
app.use(morgan('dev'))

/**
 * Init CORS. Only for develop
 */
if (config.server.env === 'development') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      optionsSuccessStatus: 200,
      credentials: true,
    })
  )
}

if (config.server.env === 'production') {
  app.use(
    cors({
      origin: ['https://navifit.vercel.app'],
      optionsSuccessStatus: 200,
      credentials: true,
    })
  )
}

/**
 * Init session
 */
// app.use(Session.init())

/**
 * Routes
 */

app.use(routes)

/**
 * Launch the server
 */
const server = app.listen(config.server.port, () => {
  console.log('[OK] Server listening on port ' + config.server.port)
})

module.exports = { server }
