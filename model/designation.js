const mongoose = require('mongoose');
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const DnsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Designation Name is a required field.'],
    trim: true,
    maxLength: 50,
    unique: true,
  },
}, {
  timestamps: true,
  strictPopulate: false
});

DnsSchema.plugin(uniqueValidator, {
  message: "Designation with name {VALUE} already exists."
})
const DesignationModel = mongoose.model('designation', DnsSchema);


module.exports = DesignationModel;