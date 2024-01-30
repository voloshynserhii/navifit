const Functions = {
  /**
   * Check that the parameter exists
   * @param param
   */
  isNull(param) {
    return param === undefined || param === null
  },

  /**
   * Is White Space
   * Check that the parameter not whitespace
   * @param param
   */
  isWhitespace(param) {
    return /^\s*$/.test(param);
  },

  /**
   * Is Empty
   * @param param
   * @returns {boolean|*}
   */
  isEmpty(param) {
    return (
      param === undefined ||
      param === null ||
      param === '' ||
      (Functions.isArray(param) && (param.length === 0 || param.every(item => Functions.isEmpty(item))))
    )
  },

  /**
   * Check mongodb id
   * @public
   * @param id
   * @param toStr
   * @return object
   */
  isId(id, toStr = false) {
    let checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
    return checkForHexRegExp.test(toStr ? id.toString() : id)
  },

  /**
   * Is Object
   * @public
   * @param obj
   * @return boolean
   */
  isObject(obj) {
    return obj === Object(obj)
  },

  /**
   * Is String
   * @public
   * @param value
   * @return boolean
   */
  isString(value) {
    return typeof value === 'string'
  },

  /**
   * Is Number
   * @param param
   * @returns {boolean}
   */
  isNumber(param) {
    return Number.isInteger(Number(param))
  },

  /**
   * Is Array
   * @param param
   * @returns {boolean}
   */
  isArray(param) {
    return Array.isArray(param)
  },

  /**
   * Is Boolean
   * @param value
   * @returns {boolean}
   */
  isBoolean(value) {
    return value === true || value === false
  },

  /**
   * Is email
   * @public
   * @param value
   * @return boolean
   */
  isEmail(value) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(value)
  },

  /**
   * Is number phone
   * @param value
   * @returns {boolean}
   */
  isPhone(value) {
    let re = /^\+\d{10,15}$/
    return re.test(value)
  },

  /**
   * Is verify code
   * @param value
   * @returns {boolean}
   */
  isVerifyCode(value) {
    let re = /^\d{6}$/
    return re.test(value)
  },

  /**
   * Is URL
   * @param value
   * @returns {boolean}
   */
  isURL(value) {
    const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
    return re.test(value)
  },

  /**
   * Check password
   * @param password
   * @returns {*}
   */
  checkPassword(password) {
    if (!Functions.isString(password) || password.leading < 8) {
      return 'Password need at least 8 char length'
    }

    if (!/^[a-zA-Z0-9_!@#$%^&*()~-]{8,100}$/.test(password)) {
      return 'Password should contain only Latin letters and special characters _ ! @ # $ % ^ & * ( ) ~'
    }

    if (!/^(?=.*[A-Z]).*$/.test(password)) {
      return 'Password need at least including one uppercase letter [A-Z]'
    }

    if (!/^(?=.*[a-z]).*$/.test(password)) {
      return 'Password need at least including one lowercase letter [a-z]'
    }

    if (!/^(?=.*[0-9]).*$/.test(password)) {
      return 'Password need at least including one numeric [0-9]'
    }

    return null
  },

  /**
   * Clearing the string from multiple spaces.
   * @public
   * @param value
   */
  cleanSpaces(value = '') {
    if (Functions.isString(value)) {
      return value.replace(/\s\s+/g, ' ').trim()
    }
    return value
  },

  /**
   * Generate hash
   * @Public
   * @param length
   */
  generateHash(length = 32) {
    let hash = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
      hash += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return hash
  },

  /**
   * Generate code
   * @Public
   * @param length
   */
  generateCode(length = 4) {
    let code = ''
    let possible = '0123456789'

    for (let i = 0; i < length; i++)
      code += possible.charAt(Math.floor(Math.random() * possible.length))

    return code
  },

  /**
   * Generate id
   * @param length
   * @param split
   * @returns {string}
   */
  generateId(length = 9, split) {
    split = split || 3
    length = length + Math.floor(length / split)
    let id = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    for (let i = 1; i < length; i++) {
      if (i % (split + 1) === 0) id += '-'
      else id += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return id
  },

  /**
   * Get alias
   * @param name
   * @returns {*}
   */
  getAlias(name) {
    if (name && Functions.isString(name)) {
      const match = name.match(/\(([^)]+)\)/)

      if (match && match.length !== 0) {
        return match[1]
      }
    }

    return name
  },

  /**
   * Format date
   * @param string
   * @returns {Date}
   */
  formatDate(string) {
    return new Date(string)
  },

  /**
   * Get Time Spend
   * @param dateStart
   * @param dateEnd
   * @returns {number}
   */
  getTimeSpend(dateStart, dateEnd) {
    const oneDay = 24 * 60 * 60 * 1000
    const days = Math.round((Functions.formatDate(dateEnd).getTime() - Functions.formatDate(dateStart).getTime()) / oneDay)

    return days > 0 ? days : 0
  },

  /**
   * Get Timestamp
   * @param full
   * @returns string
   */
  getTimestamp(full = false) {
    const date = new Date()
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)
    if (full) {
      return `${year}-${month}-${day} ${hours}:${minutes}`
    } else {
      return `${hours}:${minutes}`
    }
  },



  /**
   * Empty functions for middleware in route
   * @constructor
   */
  Empty() {
  },

  /**
   * arrayWithoutNulls - checks array for non-null values
   * @public
   * @param arr
   * @return object
   */
  arrayWithoutNulls(arr) {
    for (let i = 0; i < arr; i += 1) {
      if (Functions.isNull(arr[i])) {
        return false
      }
    }

    return true
  },
  /**
   * arrayWithUniqueObjects - checks array with objects for unique objects
   * @public
   * @param arr
   * @return boolean
   */
  arrayWithUniqueObjects(paramsArr) {
    const l = paramsArr.length
    if (l > 1) {
      for (let i = 0; i < l - 1; i++) {
        for (let j = i + 1; j < l; j++) {
          const keys = Object.keys(paramsArr[i])
          let count = 0
          for (const key of keys) {
            if (paramsArr[i][key] !== paramsArr[j][key]) {
              break
            } else {
              count++
            }
          }
          if (count === keys.length) {
            return false
          }
        }
      }
    }
    return true
  },
  
  /**
   * Append value to array in object
   * @param object
   * @param path
   * @param value
   * @returns { void }
   */
  arrayAppendToObject: (object, path, value) => {
    if (typeof object !== 'object') return object;
    (Array.isArray(path) ? path : path.split('.')).reduce((o, k, i, _) => {
      if (i === _.length - 1) {
        Array.isArray(o[k]) ? o[k].push(value) : o[k] = [value]
        return null
      } else if (k in o) {
        return o[k]
      } else {
        o[k] = /^[0-9]{1,}$/.test(_[i + 1]) ? [] : {}
        return o[k]
      }
    }, object)
  },
}

module.exports = Functions
