const express = require('express');
const router = express.Router();
const UserModel = require("../model/user")
const AddressModel = require("../model/address")
const {prepareData, generateQRCode} = require("../pdf/helper")
const generateSC = require("../pdf/templates/scTemplate");
const generateSTC = require("../pdf/templates/stcTemplate");
const generateCOE = require("../pdf/templates/coeTemplate");
const nationalities = require("i18n-nationality");
const {
  SALARY_CERTIFICATE_SHORT,
  SALARY_TRANSFER_CERTIFICATE_SHORT,
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

router.get(
  '/profile-basic',
  async (req, res, next) => {
    try {
      const {id} = req.query
      let user = await UserModel.findOne({_id: id}).populate("designation")

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
        designation: dns
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
      let user = await UserModel.findByIdAndUpdate(id, {...req.body, designation: dns},
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

      obj = {
        ...obj,
        localAddress: localAdd.streetAddress,
        localCountry: localAdd.country,
        localCity: localAdd.city,
        permanentAddress: permAdd.streetAddress,
        permanentCountry: permAdd.country,
        permanentCity: permAdd.city,
      }

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

router.post(
  '/generate/:id',
  async (req, res) => {

    try {
      const userId = req.params.id
      const {formType} = req.body

      let employee = await UserModel.findOne({_id: userId}).populate('designation')

      if (!employee || !(formType in CERTIFICATES_OBJ)) {
        return res.status(400).json({success: false, message: "Invalid Request"})
      }

      // make an entry into certificates table
      let todayDate = new Date()

      let cert = new CertsModel({
        docNo: req.body.docNo,
        docType: CERTIFICATES_OBJ[formType],
        issuedTo: employee,
        issuedBy: req.user,
        issuedOn: todayDate,
      })

      cert = await cert.save()
      let filename = `${formType}_${employee.empId}_${employee.fullName()}_${moment(todayDate).format("DDMMYYYY-HHMMSS")}_UNSIGNED.pdf`

      // TODO check if directory exist

      let certPath = path.join("/certificates", formType.toLowerCase(), filename)

      // qrcode url
      let qrcodeUrl = `${req.protocol}:\//${req.get('host')}/docs/view/${cert._id}`;
      let qrcode = await generateQRCode({certificateUrl: qrcodeUrl})
      let dataForTemplate = prepareData(req.body, employee, qrcode)

      if (dataForTemplate) {
        let result;
        if (formType === SALARY_CERTIFICATE_SHORT) {
          result = await generateSC(dataForTemplate, certPath)
        } else if (formType === SALARY_TRANSFER_CERTIFICATE_SHORT) {
          console.log("--SALARY_TRANSFER_CERTIFICATE_SHORT--", SALARY_TRANSFER_CERTIFICATE_SHORT)
          result = await generateSTC(dataForTemplate, certPath)
        } else if (formType === EXPERIENCE_LETTER_SHORT) {
          console.log("--EXPERIENCE_LETTER_SHORT--", EXPERIENCE_LETTER_SHORT)
          result = await generateCOE(dataForTemplate, certPath)
        }
        if (result) {
          cert.certUnsignedPath = certPath
          cert.fileName = filename
          await cert.save()

          res.setHeader('Content-type', 'application/pdf')
          res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
          res.setHeader('requestId', `${cert._id}`)
          return fs.createReadStream(`.${certPath}`).pipe(res);
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
