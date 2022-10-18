const express = require('express');
const router = express.Router();
const UserModel = require("../model/user")
const AddressModel = require("../model/address")
const {add} = require("nodemon/lib/rules");

router.get(
	'/profile',
	(req, res, next) => {
		res.json({
			message: 'You made it to the secure route',
			user: req.user,
		})
	}
);

router.post(
	'/add',
	async (req, res) => {
		try {
			const {
				firstName, lastName, gender, dob, primaryMobile, secondaryMobile, email, doj,
				localAddress, localCountry, localCity, permanentAddress, permanentCountry, permanentCity,
			} = req.body

			// save user details
			const user = new UserModel({
				firstName, lastName, gender, primaryMobile, secondaryMobile,
				dob, doj, email,
			})

			let userObj = await user.save()

			// save local address
			let addressLocal = new AddressModel({
				streetAddress: localAddress,
				country: localCountry,
				city: localCity,
				addressType: 'LOCAL',
				occupant: userObj,
				createdBy: req.user,
				modifiedBy: req.user
			})

			await addressLocal.save()

			// save permanent address
			let addressPermanent = new AddressModel({
				streetAddress: permanentAddress,
				country: permanentCountry,
				city: permanentCity,
				addressType: 'PERMANENT',
				occupant: userObj,
				createdBy: req.user,
				modifiedBy: req.user
			})

			await addressPermanent.save()

			res.status(201).json({"message": 'success'})
		} catch (error) {
			console.log('--error--', error)
			res.status(400).json({'message': error.message})
		}
	}
)

module.exports = router;