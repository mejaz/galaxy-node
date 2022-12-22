const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  shortName: {
    type: String,
    required: [true, 'Company Name is a required field.'],
    trim: true,
    maxLength: 50,
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, 'Company Name is a required field.'],
    trim: true,
    maxLength: 100,
    unique: true,
  },
}, {
  timestamps: true,
  strictPopulate: false
});

CompanySchema.plugin(uniqueValidator, {
  message: "Company with name {VALUE} already exists."
})
const CompanyModel = mongoose.model('company', CompanySchema);


module.exports = CompanyModel;
