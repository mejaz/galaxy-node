const mongoose = require('mongoose');

const LOCAL = 'LOCAL'
const PERMANENT = 'PERMANENT'

const ADD_TYPES = [
	LOCAL,
	PERMANENT,
]

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
	streetAddress: {
		type: String,
		required: false,
		trim: true,
		maxLength: 100,
	},
	country: {
		type: String,
		required: false,
		trim: true,
		maxLength: 5,
	},
	city: {
		type: String,
		required: false,
		trim: true,
		maxLength: 5,
	},
	addressType: {
		type: String,
		required: [true, 'Address Type is a required field.'],
		enum: {
			values: ADD_TYPES,
			message: `{VALUE} id not supported`
		},
	},
	occupant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	modifiedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
}, {
	timestamps: true,
});

const AddressModel = mongoose.model('address', AddressSchema);

module.exports = AddressModel;