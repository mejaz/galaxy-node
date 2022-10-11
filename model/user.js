const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

UserSchema.pre(
  'save',
  async function(next) {
    const user = this;
    this.password = await bcrypt.hash(this.password, 10);

    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
}

// hiding private data in user model
UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.createdAt
  delete userObject.updatedAt

  return userObject
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;