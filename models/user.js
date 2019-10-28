const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validate.isEmail(v),
      message: 'Invalid email format',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validate.isURL(v),
      message: (props) => `${props.value} : Invalid URL`,
    },
  },
});

userSchema.statics.findUserByCreds = (email, password) => this.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      throw Promise.reject(new Error('Wrong email or password'));
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw Promise.reject(new Error('Wrong email or password'));
        }
        return user;
      });
  })
  .catch((error) => error);

module.exports = mongoose.model('user', userSchema);
