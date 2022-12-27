const express = require('express');
const router = express.Router();
const UserModel = require("../model/user")
const AddressModel = require("../model/address")
const nationalities = require("i18n-nationality");
const moment = require("moment");
const DesignationModel = require("../model/designation");

router.get(
  '/profile',
  async (req, res, next) => {
    try {
      const {id} = req.query
      let responseObj = {}
      let user = await UserModel.findOne({_id: id, company: req.user.company})

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

router.get(
  '/profile-basic',
  async (req, res, next) => {
    try {
      const {id} = req.query
      let user = await UserModel.findOne({_id: id, company: req.user.company}).populate("designation")

      if (!user) {
        return res.status(400).json({message: 'User not found!'})
      }

      const responseObj = {
        empId: user.empId,
        fullName: user.fullNameWithTitle(),
        designation: user.designation.name,
        doj: moment(user.doj).format("Do MMMM YYYY"),
        lwd: moment(user.lwd).format("Do MMMM YYYY"),
        nationality: nationalities.getName(user.nationality, 'en'),
        passNo: user.passNo
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
        designation, localAddress, localCountry, localCity, permanentAddress, permanentCountry, permanentCity, ...rest
      } = req.body

      const dns = await DesignationModel.findById(designation)

      if (!dns) {
        return res.status(400).json({message: "Invalid designation"})
      }

      // save user details
      const user = new UserModel({
        ...rest,
        designation: dns,
        company: req.user.company,
      })

      let userObj = await user.save()

      if (localAddress || localCountry || localCity) {
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
      }

      if (permanentAddress || permanentCountry || permanentCity) {
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
      }

      return res.status(201).json({success: true, message: 'For submitted successfully!'})
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

      const dns = await DesignationModel.findById(req.body.designation)

      if (!dns) {
        return res.status(400).json({message: "Invalid designation"})
      }

      // update user details
      let user = await UserModel.findOneAndUpdate({_id: id, company: req.user.company}, {...req.body, designation: dns},
        {new: true})

      // update local address
      let localAdd = await AddressModel.findOneAndUpdate({occupant: user, addressType: 'LOCAL'}, {
          streetAddress: req.body.localAddress,
          country: req.body.localCountry,
          city: req.body.localCity,
        },
        {new: true, upsert: true})

      // update permanent address
      let permAdd = await AddressModel.findOneAndUpdate({occupant: user, addressType: 'PERMANENT'}, {
          streetAddress: req.body.permanentAddress,
          country: req.body.permanentCountry,
          city: req.body.permanentCity,
        },
        {new: true, upsert: true})

      let obj = user.toObject()
      delete obj['password']

      return res.status(201).json({success: true, message: 'For submitted successfully!'})
    } catch (error) {
      console.log('--error--', error)
      return res.status(400).json({'message': error.message})
    }
  }
)

router.get(
  '/search',
  async (req, res) => {
    const {rowsPerPage, page, empId, mobNo, ...nameParts} = req.query

    const skip = +page * +rowsPerPage
    const limit = +rowsPerPage

    let filterOptions = {company: req.user.company, role: {$ne: 'ADMIN'}}

    if (empId) {
      filterOptions["empId"] = {'$regex': empId, '$options': 'i'}
    } else if (mobNo) {
      // searching only with the last 9 chars or less
      filterOptions["primaryMobile"] = mobNo.length <= 9 ? mobNo : mobNo.slice(-9)
    } else {
      let orFilters = []
      for (const item in nameParts) {
        let itemVal = nameParts[item]
        if (itemVal) orFilters.push({[item]: {'$regex': itemVal, '$options': 'i'}})
      }
      filterOptions["$or"] = orFilters
    }

    let count = await UserModel.countDocuments(filterOptions)
    let rows = await UserModel.find(filterOptions).skip(skip).limit(limit).sort("-createdAt")

    return res.json({count, rows})
  }
)


module.exports = router;
