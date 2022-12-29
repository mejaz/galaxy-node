const mongoose = require('mongoose');
const validator = require('validator')
const {SALARY_CERTIFICATE, SALARY_TRANSFER_LETTER, EXPERIENCE_LETTER} = require("../src/constants")
const uniqueValidator = require('mongoose-unique-validator');

const CERTIFICATES = [
  SALARY_CERTIFICATE,
  SALARY_TRANSFER_LETTER,
  EXPERIENCE_LETTER,
]

const Schema = mongoose.Schema;

const CertsSchema = new Schema({
  docNo: {
    type: String,
    required: [true, 'Document Number is a required field.'],
    trim: true,
    maxLength: 50,
    unique: true,
  },
  fileName: {
    type: String,
    trim: true,
    maxLength: 100,
  },
  docType: {
    type: String,
    required: [true, 'Document Type is a required field.'],
    enum: {
      values: CERTIFICATES,
      message: `{VALUE} id not supported`
    },
  },
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  issuedOn: {
    type: Date,
    required: true,
  },
  preCertS3Url: {
    type: String,
    trim: true,
  },
  certS3Url: {
    type: String,
    trim: true,
  },
  certS3Key: {
    type: String,
    trim: true,
  },
  isSigned: {
    type: Boolean,
    required: true,
    default: false,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
    required: true,
  },
}, {
  timestamps: true,
  strictPopulate: false
});

CertsSchema.plugin(uniqueValidator, {
  message: "Document with document number {VALUE} already exists."
})
const CertsModel = mongoose.model('certs', CertsSchema);


module.exports = CertsModel;