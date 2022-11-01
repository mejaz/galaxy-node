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
  empId: {
    type: String,
    required: [true, 'Employee Id is a required field.'],
    trim: true,
    unique: true,
    maxLength: 10,
    minLength: 3,
  },
  firstName: {
    type: String,
    required: [true, 'First Name is a required field.'],
    trim: true,
    maxLength: 50,
    minLength: 3,
    validate: {
      validator: function (value) {
        return validator.isAlpha(value, 'en-US', {ignore: '\s'})  // ignore whitespaces
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
    validate: {
      validator: function (value) {
        return validator.isAlpha(value, 'en-US', {ignore: '\s'})  // ignore whitespaces
      },
      message: props => `${props.value} should be only alphabets`
    }
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
    maxLength: [9, 'Enter 9 digit mobile number after +971'],
    minLength: [9, 'Enter 9 digit mobile number after +971'],
    validate: {
      validator: function (value) {
        return validator.isNumeric(value)
      },
      message: props => `${props.value} should be only 10 chars`
    }
  },
  secondaryMobile: {
    type: String,
    trim: true,
    required: false,
    validate: {
      validator: function (value) {
        return value ? validator.isNumeric(value) : true
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
  },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'designation',
    required: true,
  },
}, {
  timestamps: true,
  strictPopulate: false
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

// get full name
UserSchema.methods.fullName = function () {
  const user = this
  return `${user.firstName} ${user.lastName}`
}

// get full name with title
UserSchema.methods.fullNameWithTitle = function () {
  const user = this
  let fullName = user.fullName()
  return user.gender === 'M' ? `Mr. ${fullName}` : `Ms. ${fullName}`
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;