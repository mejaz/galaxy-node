const mongoose = require('mongoose');

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
});

module.exports = AddressSchema