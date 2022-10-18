const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const ADMIN = 'ADMIN'
const MANAGER = 'MANAGER'
const LEAD = 'LEAD'
const STAFF = 'STAFF'

const ROLES = [
  ADMIN,
  MANAGER,
  LEAD,
  STAFF
]

const GENDERS = [
  'M',
  'F'
]

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is a required field.'],
    trim: true,
    maxLength: 50,
    minLength: 3,
    validate: {
      validator: function (value) {
        return validator.isAlpha(value)
      },
      message: props => `${props.value} should be only alphabets`
    }
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is a required field.'],
    trim: true,
    maxLength: 50,
    minLength: 3,
  },
  gender: {
    type: String,
    required: [true, 'Gender is a required field.'],
    enum: {
      values: GENDERS,
      message: `{VALUE} id not supported`
    },
  },
  role: {
    type: String,
    required: [true, 'Role is a required field.'],
    enum: {
      values: ROLES,
      message: `{VALUE} id not supported`
    },
    default: STAFF,
  },
  primaryMobile: {
    type: String,
    required: [true, 'Primary Mobile is a required field.'],
    trim: true,
    maxLength: 13,
    minLength: 13,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, 'ar-AE', {
          strictMode: true
        } )
      },
      message: props => `${props.value} should be only 13 chars`
    }
  },
  secondaryMobile: {
    type: String,
    trim: true,
    maxLength: 14,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value)
      },
      message: props => {
        console.log(props)
        return `${props}`
      }
    }
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isDate(value) && new Date(value) < new Date();
      },
      message: props => `${props.value} cannot be current/future date`
    }
  },
  doj: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isDate(value) && new Date(value) < new Date();
      },
      message: props => `${props.value} cannot be current/future date`
    }
  },
  isStaff: {
    type: Boolean,
    default: false,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    maxLength: 100,
    validate: {
      validator: function(value) {
        return validator.isEmail(value)
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  password: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
});

UserSchema.pre(
  'save',
  async function(next) {
    const user = this;
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }

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