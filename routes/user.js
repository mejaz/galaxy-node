const express = require('express');
const router = express.Router();
const UserModel = require("../model/user")
const nationalities = require("i18n-nationality");
const moment = require("moment");
const DesignationModel = require("../model/designation");

async function addUpdateAddress(userObj, localAddress, localCountry, localCity, permanentAddress, permanentCountry, permanentCity) {
  userObj.localAddress = {
    streetAddress: localAddress,
    country: localCountry,
    city: localCity
  }
  userObj = await userObj.save()

  userObj.permanentAddress = {
    streetAddress: permanentAddress,
    country: permanentCountry,
    city: permanentCity
  }
  userObj = await userObj.save()
}

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

      await addUpdateAddress(userObj, localAddress, localCountry, localCity, permanentAddress, permanentCountry, permanentCity);

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

      const {
        localAddress,
        localCountry,
        localCity,
        permanentAddress,
        permanentCountry,
        permanentCity,
        ...rest
      } = req.body

      // update user details
      let userObj = await UserModel.findOneAndUpdate({_id: id, company: req.user.company}, {...rest, designation: dns},
        {new: true})

      await addUpdateAddress(userObj, localAddress, localCountry, localCity, permanentAddress, permanentCountry, permanentCity);

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

    let filterOptions = {company: req.user.company}

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
