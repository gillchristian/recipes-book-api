const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({

  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

})

UserSchema.pre('save', function preSaveHook(next) {
  if (!this.isModified('password')) return next()
  return bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err)
    this.password = hash
    return next()
  })
})

UserSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
