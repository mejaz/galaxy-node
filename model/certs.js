const mongoose = require('mongoose');
const validator = require('validator')
const {SALARY_CERTIFICATE, SALARY_TRANSFER_CERTIFICATE, EXPERIENCE_LETTER} = require("../src/constants")
const uniqueValidator = require('mongoose-unique-validator');

const CERTIFICATES = [
  SALARY_CERTIFICATE,
  SALARY_TRANSFER_CERTIFICATE,
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
    ref: 'User',
    required: true,
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issuedOn: {
    type: Date,
    required: true,
  },
  certUnsignedPath: {
    type: String,
    trim: true,
  },
  certSignedPath: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

CertsSchema.plugin(uniqueValidator, {
  message: "Document with document number {VALUE} already exists."
})
const CertsModel = mongoose.model('certs', CertsSchema);


module.exports = CertsModel;