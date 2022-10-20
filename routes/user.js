const express = require('express');
const router = express.Router();
const UserModel = require("../model/user")
const AddressModel = require("../model/address")
const {add} = require("nodemon/lib/rules");

router.get(
	'/profile',
	async (req, res, next) => {
		try {
			const {id} = req.query
			let responseObj = {}
			console.log(id)
			let user = await UserModel.findOne({_id: id})

			if (!user) {
				return res.status(400).json({message: 'User not found!'})
			}

			let userObj = user.toObject()
			delete userObj['password']

			responseObj = {...responseObj, ...userObj}

			// query addresses
			let addresses = await AddressModel.find({occupant: user})
			for (let obj of addresses) {
				if (obj.addressType === 'LOCAL') {
					responseObj = {
						...responseObj,
						localAddress: obj.streetAddress,
						localCountry: obj.country,
						localCity: obj.city,
					}
				} else {
					responseObj = {
						...responseObj,
						permanentAddress: obj.streetAddress,
						permanentCountry: obj.country,
						permanentCity: obj.city,
					}
				}
			}
			return res.json(responseObj)
		} catch (error) {
			console.log(error)
			return res.status(400).json({message: 'Invalid request'})
		}
	}
);

router.post(
	'/add',
	async (req, res) => {
		try {
			const {
				empId, firstName, lastName, gender, dob, primaryMobile, secondaryMobile, email, doj,
				localAddress, localCountry, localCity, permanentAddress, permanentCountry, permanentCity,
			} = req.body

			// save user details
			const user = new UserModel({
				empId, firstName, lastName, gender, primaryMobile, secondaryMobile,
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

			return res.status(201).json({"message": 'success'})
		} catch (error) {
			console.log('--error--', error)
			return res.status(400).json({'message': error.message})
		}
	}
)

router.post(
	'/edit',
	async (req, res) => {
		try {
			delete req.body['empId']

			const {id} = req.query
			if (!id) {
				return res.status(400).json({message: 'Invalid User!'})
			}

			// remove fields we don't want to update
			delete req.body['_id']
			delete req.body['createdAt']
			delete req.body['updatedAt']
			delete req.body['empId']
			delete req.body['isStaff']
			delete req.body['role']

			console.log("--req.body--", req.body)

			// update user details
			let user = await UserModel.findByIdAndUpdate(id, req.body,
				{new: true})

			// update local address
			let localAdd = await AddressModel.findOneAndUpdate({occupant: user, addressType: 'LOCAL'}, {
					streetAddress: req.body.localAddress,
					country: req.body.localCountry,
					city: req.body.localCity,
				},
				{new: true})

			// update permanent address
			let permAdd = await AddressModel.findOneAndUpdate({occupant: user, addressType: 'PERMANENT'}, {
					streetAddress: req.body.permanentAddress,
					country: req.body.permanentCountry,
					city: req.body.permanentCity,
				},
				{new: true})

			let obj = user.toObject()
			delete obj['password']

			obj = {
				...obj,
				localAddress: localAdd.streetAddress,
				localCountry: localAdd.country,
				localCity: localAdd.city,
				permanentAddress: permAdd.streetAddress,
				permanentCountry: permAdd.country,
				permanentCity: permAdd.city,
			}

			console.log(obj)

			return res.status(201).json({...obj})
		} catch (error) {
			console.log('--error--', error)
			return res.status(400).json({'message': error.message})
		}
	}
)

router.get(
	'/search',
	async (req, res) => {
		const {pageSize, pageNo, ...filterOptions} = req.query

		for (const item in filterOptions) {
			if (filterOptions[item] === "") {
				delete filterOptions[item]
			} else {
				if (item !== 'empId') {
					let itemVal = filterOptions[item]
					filterOptions[item] = {'$regex': itemVal, '$options': 'i'}
				}
			}
		}

		let users = await UserModel.find({...filterOptions},)
		return res.json(users)
	}
)

module.exports = router;