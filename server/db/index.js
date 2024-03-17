const mongoose = require('mongoose')
const config = require('../config')
const tunnel = require('tunnel-ssh')

/**
 * Override Promise
 */
mongoose.Promise = global.Promise

const db = mongoose.connection

/**
 * Connect to DB
 */
const connectDb = (dbUri) => {
  if (!dbUri) {
    console.error('[FAILED] No configs for MongoDB')
    process.exit(-1)
  }

  mongoose.connect(dbUri, {
    maxPoolSize: 10,
    //keepAlive: true, // - Use this for big import scripts to prevent timeouts
    //socketTimeoutMS: 30000000, // - Use this for big import scripts to prevent timeouts
  })

  /**
   * Check connect
   */
  db.on('error', () => {
    console.error('[FAILED] Unable to establish connection to mongodb.')
    process.exit(-1)
  })

  db.once('open', () => {
    console.log('[OK] Application connect to mongodb')
  })
}

// if (config.server.env === 'development' && !!config.db.host) {
//   if (!config.sshTunnel.host || !config.sshTunnel.user || !config.sshTunnel.privateKey) {
//     console.error('[FAILED] No configs for tunnel-ssh')
//     process.exit(-1)
//   }

//   if (!config.db.password) {
//     console.error('[FAILED] No configs for DB')
//     process.exit(-1)
//   }

//   const privateKey = config.sshTunnel.privateKey.replace(/\\n/g, '\n')
//   const tunelConfig = {
//     host: config.sshTunnel.host,
//     username: config.sshTunnel.user,
//     privateKey,
//     dstHost: config.db.host,
//     dstPort: 27017,
//     localPort: 27000,
//   }

//   tunnel(tunelConfig, (error) => {
//     if (error) {
//       console.log('SSH connection error: ' + error)
//       process.exit(1)
//     }
//     connectDb(`mongodb://regdesk:${config.db.password}@localhost:27000/${config.db.name || 'rd'}`)
//   })
// } else {
//   connectDb(config.db.uri)
// }

connectDb(config.db.uri)

module.exports = {
  db,
  user: require('./models/User.model'),
  recipe: require('./models/Recipe.model'),
  plan: require('./models/Plan.model'),
  toObjectId: (id) => new mongoose.Types.ObjectId(id),
}
