const express = require('express');
const router = express.Router();
const UserModel = require("../model/user")
const AddressModel = require("../model/address")
const {prepareData, generateQRCode, generateFilename, generateCertPath} = require("../pdf/helper")
const generateSC = require("../pdf/templates/scTemplate");
const generateSTC = require("../pdf/templates/stcTemplate");
const generateCOE = require("../pdf/templates/coeTemplate");
const nationalities = require("i18n-nationality");
const {
  SALARY_CERTIFICATE_SHORT,
  SALARY_TRANSFER_LETTER_SHORT,
  EXPERIENCE_LETTER_SHORT,
  CERTIFICATES_OBJ
} = require("../src/constants")
const CertsModel = require("../model/certs");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
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

router.post(
  '/generate/:id',
  async (req, res) => {

    try {
      const userId = req.params.id
      const {formType} = req.body

      // query employee
      let employee = await UserModel.findOne({_id: userId, company: req.user.company}).populate('designation')

      if (!employee || !(formType in CERTIFICATES_OBJ)) {
        // in case of invalid user or invalid certificate request, return 400
        return res.status(400).json({success: false, message: "Invalid Request"})
      }

      // if employee is still active, we can't generate experience letter
      if (employee.isActive && formType === EXPERIENCE_LETTER_SHORT) {
        return res.status(400).json({
          success: false,
          message: "Employee still active, cannot generate Experience Letter."
        })
      }

      // make an entry into certificates table
      let dateToday = new Date()
      let cert = new CertsModel({
        docNo: req.body.docNo,
        docType: CERTIFICATES_OBJ[formType],
        issuedTo: employee,
        issuedBy: req.user,
        issuedOn: dateToday,
        company: req.user.company,
      })
      cert = await cert.save()

      const company = req.user.company.shortName.toLowerCase()
      // generate the pdf filename
      let filename = generateFilename(formType, employee, dateToday, false)
      // generate certificate path
      let certPath = generateCertPath(formType, company, filename)
      // generate QR Code
      let qrcode = await generateQRCode(req, cert)
      // prepare the data that goes into the certificate
      let dataForTemplate = prepareData(req.body, employee, qrcode)

      if (dataForTemplate) {
        let result;
        if (formType === SALARY_CERTIFICATE_SHORT) {
          result = await generateSC(dataForTemplate, certPath, company)
        } else if (formType === SALARY_TRANSFER_LETTER_SHORT) {
          result = await generateSTC(dataForTemplate, certPath, company)
        } else if (formType === EXPERIENCE_LETTER_SHORT) {
          result = await generateCOE(dataForTemplate, certPath, company)
        }
        console.log("-->", certPath)
        if (result) {
          cert.certUnsignedPath = certPath
          cert.fileName = filename
          await cert.save()

          res.setHeader('Content-type', 'application/pdf')
          res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
          res.setHeader('requestId', `${cert._id}`)
          return fs.createReadStream(certPath).pipe(res);
        } else {
          await cert.delete()  // remove this entry from the DB as there was issue in generating pdf
          return res.status(400).json({message: "Error generating pdf"})
        }
      } else {
        return res.status(400).send({message: "Invalid Request, not all data provided"})
      }
    } catch (error) {
      console.log(error)
      return res.status(400).send({message: error.message})
    }
  }
)

module.exports = router;
