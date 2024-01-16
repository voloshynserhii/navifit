const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const config = require('../config')
const db = require('../db')
const moment = require('moment')

/**
 * Check config
 */
if (
  !config.cookie.name ||
  !config.cookie.maxAge ||
  !config.cookie.secret ||
  !config.cookie.userSecret ||
  config.cookie.secure === undefined
) {
  console.error('[FAILED] No configs for Session')
  process.exit(-1)
}

/**
 * Session util
 */
module.exports = {

  /**
   * Init session
   */
  init() {
    const {
      name,
      secret,
      secure,
      maxAge,
    } = config.cookie

    const ttl = maxAge + 120
    const expires = 1000 * ttl

    return session({
      name: name + '_api',
      secret,
      resave: false,
      saveUninitialized: false,
      unset: 'destroy',
      rolling: false,
      cookie: {
        httpOnly: 'true',
        secure,
        maxAge: expires
      },
      store: new MongoStore({
        mongooseConnection: db.db,
        ttl,
      })
    })
  },


  /**
   * Check auth
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */
  isAuth(req, res, next) {
    if (!req.session || !req.session.user) {
      return res.sendError('103')
    }

    db.user
      .findById(req.session.user)
      .exec()
      .then(user => {
        const momentNow = moment().subtract(.3, 'minutes')

        req.user = user

        if (!req.user.parent && config.su.includes(req.user.email)) {
          req.su = true
        }

        if (user.lastSeen && moment(user.lastSeen).isBefore(momentNow, 'minute')) {
          user.lastSeen = new Date()
          return user.save()
        }
      })
      .then(() => {
        if (req.user && req.user.parent) {
          return db.user
            .findById(req.user.parent)
            .exec()
            .then(parent => {
              req.sub_user = req.user
              req.user = parent
            })
        }
      })
      .then(() => {
        if (!req.user) {
          return res.sendError('101')
        }

        if (req.sub_user) {
          req.user.parentPermissions = [...req.user.permission]
          req.user.permission = req.sub_user.permission.filter(item =>
            req.user.permission.findIndex(el => item === el) !== -1
          )
        }

        if (!req.query.timer) {
          req.session.timeOut = Date.now() + 1000 * config.cookie.maxAge
        }

        next()
      })
      .catch(err => res.sendDbError(err))
  },


  /**
   * Check session timeout
   * @param req
   * @param res
   * @returns {*}
   */
  Timeout(req, res) {
    if (
      !req.session ||
      !req.session.user ||
      (req.session.timeOut && req.session.timeOut < Date.now())
    ) {
      return req.session.destroy(() => {
        res.sendError('104')
      })
    }
    const timeToShowModal = Math.floor((req?.session?.timeOut - Date.now()) / 1000 / 60)
    if (
      req.session &&
      req.session.user &&
      (req.session.timeOut && timeToShowModal <= 30)
    ) {
      return res.json(timeToShowModal)
    }

    res.json({})
  },


  /**
   * Check session
   * @param req
   * @param res
   * @param next
   */
  Check(req, res, next) {
    if (!req.session || !req.session.user) {
      return res.json({
        loginAzure: !!config.azure.loginUrl,
        loginOkta: !!config.okta.loginUrl,
      })
    }

    next()
  },


  /**
   * Check secret for system call
   * @param req
   * @param res
   * @param next
   * @returns {*}
   * @constructor
   */
  CheckSecret(req, res, next) {
    const { secret } = req.params

    if (secret !== config.cookie.secret) {
      return res.sendError('104')
    }

    next()
  },

  /**
   * Check secret for user call
   * @param req
   * @param res
   * @param next
   * @returns {*}
   * @constructor
   */
  CheckUserSecret(req, res, next) {
    const { secret } = req.params

    if (secret !== config.cookie.userSecret) {
      return res.sendError('104')
    }

    next()
  },


  /**
   * Update session
   * @param req
   * @param res
   * @constructor
   */
  Update(req, res) {
    res.json({})
  },
}
