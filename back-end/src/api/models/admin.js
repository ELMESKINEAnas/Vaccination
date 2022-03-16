const mongoose = require('mongoose');
const crypto = require('crypto')
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});
//Create virtual champs 'password'
adminSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.hashed_password = this.cryptPass(password)
  })
  .get(function () {
    return this._password
  })
//Create method for crypt password
adminSchema.methods = {
  authenticate: function(pass){
    return this.cryptPass(pass) === this.hashed_password;
  },
  cryptPass: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', 'u_238')
        .update(password)
        .digest('hex');
    } catch (err) {
      console.log("4444")
      return ''
    }
  }
}
module.exports = mongoose.model('Admin',adminSchema);