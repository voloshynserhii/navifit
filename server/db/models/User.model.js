const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      dropDups: true,
      trim: true,
    },
    userData: Object,
    currentPlan: Object, //generating every month
    lastGenerated: Date,
    hashedPassword: { type: String, trim: true },
    salt: {
      type: String,
      // default: Math.random().toString().substr(2),
      trim: true,
    },
    lastLogin: Object,
    isDraftUser: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },

    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// const options = { collectionName: 'user' }

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
  this.previousHashedPasswords = this.previousHashedPasswords ?? []
  this.previousHashedPasswords.push({
    hashedPassword: this.hashedPassword,
    salt: this.salt,
  })
  this.previousHashedPasswords = this.previousHashedPasswords.slice(-4)

  this.salt = this.makeSalt()
  this.hashedPassword = this.encryptPassword(password)
  this.lastPasswordChange = new Date()
})

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64')
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {String} salt
   * @return {String}
   * @api public
   */
  encryptPassword: function(password, salt = null) {
    if (!password || !this.salt) {
      return ''
    }

    const saltBase64 = Buffer.from(salt ?? this.salt, 'base64')

    return crypto
      .pbkdf2Sync(password, saltBase64, 10000, 64, 'sha1')
      .toString('base64')
  },

  /**
   * isPasswordPreviouslyUsed - check if the password was previously used
   *
   * @param {String} password
   * @return {Boolean}
   * @api public
   */
  isPasswordPreviouslyUsed: function(password) {
    if (!password) {
      return true
    }

    return this.previousHashedPasswords.some(({ hashedPassword, salt }) => this.encryptPassword(password, salt) === hashedPassword)
  },
}

module.exports = mongoose.model('User', UserSchema)
