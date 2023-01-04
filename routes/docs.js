const express = require('express');
const CertsModel = require("../model/certs");
const UserModel = require("../model/user");
const moment = require("moment");
const fs = require("fs");
const router = express.Router();
const multer = require("multer");
const {CERTIFICATES_SHORT_OBJ, CERTIFICATES_OBJ,
  EXPERIENCE_LETTER_SHORT,
  SALARY_CERTIFICATE_SHORT,
  SALARY_TRANSFER_LETTER_SHORT
} = require("../src/constants")
const nationalities = require("i18n-nationality");
const CompanyModel = require("../model/company");
const {generateFilename, generateCertPath, generateQRCode, prepareData} = require("../pdf/helper");
const generateSC = require("../pdf/templates/scTemplate");
const generateSTC = require("../pdf/templates/stcTemplate");
const generateCOE = require("../pdf/templates/coeTemplate");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const docType = CERTIFICATES_SHORT_OBJ[req.body.docType].toLowerCase()
    const dir = `certificates/${docType}/`;
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    req.dirLoc = dir
    req.docType = docType
    callback(null, dir);
  },
  filename: async (req, file, callback) => {
    const {id} = req.params
    let cert = await CertsModel.findById(id).populate('issuedTo')
    if (!cert) {
      callback(new Error("Invalid request Id"))
    } else {
      let todayDate = new Date()
      let fileName = `${req.docType.toUpperCase()}_${cert.issuedTo.empId}_${cert.issuedTo.fullName()}_${moment(todayDate).format("DDMMYYYY-HHMMSS")}_SIGNED.pdf`
      cert.certSignedPath = `${req.dirLoc}${fileName}`
      cert = await cert.save()
      req.cert = cert

      callback(null, fileName);
    }

  }
})

const fileFilter = async (req, file, callback) => {
  let ext = file.originalname.lastIndexOf(".");
  ext = file.originalname.substr(ext + 1);
  if (ext.toLowerCase() !== 'pdf') {
    callback(new Error("File extension not supported, please upload .pdf file"))
  } else {
    callback(null, true)
  }
}

const upload = multer({storage, fileFilter}).single("file");


const serializeCerts = (certs) => certs.map(cert => {
  return {
    _id: cert.id,
    docNo: cert.docNo,
    docType: cert.docType,
    issuedTo: cert.issuedTo.fullName(),
    issuedBy: cert.issuedBy.lastName,
    issuedOn: cert.issuedOn,
    isSignedUploaded: !!cert.certSignedPath,
  }
})

router.get(
  '/types',
  async (req, res) => {
    try {
      const docTypes = []
      for (const item in CERTIFICATES_OBJ) {
        docTypes.push({
          key: item,
          label: CERTIFICATES_OBJ[item]
        })
      }
      return res.json(docTypes)
    } catch (error) {
      return res.json({message: error.message})
    }
  }
)

router.get(
  '/search',
  async (req, res) => {
    const {rowsPerPage, page, docType, docNo, empId, lastName} = req.query
    let result

    const skip = +page * +rowsPerPage
    const limit = +rowsPerPage

    let defaultFilterOptions = {company: req.user.company}

    if (docType) {
      defaultFilterOptions["docType"] = CERTIFICATES_OBJ[docType]
    }

    if (docNo) {
      const filterOpts = {docNo: {'$regex': docNo, '$options': 'i'}, ...defaultFilterOptions}
      const count = await CertsModel.countDocuments({...filterOpts})
      let certs = await CertsModel.find({...filterOpts})
        .skip(skip)
        .limit(limit)
        .populate('issuedTo issuedBy')
      result = {
        count,
        rows: serializeCerts(certs)
      }

    } else if (empId) {
      let issuedTo = await UserModel.findOne({empId: {'$regex': empId, '$options': 'i'}, company: req.user.company})
      if (!issuedTo) {
        return res.json([])
      }

      const filterOpts = {issuedTo, ...defaultFilterOptions}
      const count = await CertsModel.countDocuments({...filterOpts})
      let certs = await CertsModel
        .find({...filterOpts})
        .skip(skip)
        .limit(limit)
        .sort("-issuedOn")
        .populate('issuedTo issuedBy')
      result = {
        count,
        rows: serializeCerts(certs)
      }
    } else if (lastName) {
      let users = await UserModel.find({lastName: {'$regex': lastName, '$options': 'i'}, company: req.user.company})
      let userIds = users.map(obj => obj._id)

      const filterOpts = {issuedTo: {$in: userIds}, ...defaultFilterOptions}
      const count = await CertsModel.countDocuments({...filterOpts})
      let certs = await CertsModel
        .find({...filterOpts})
        .skip(skip)
        .limit(limit)
        .populate('issuedTo issuedBy')
      result = {
        count,
        rows: serializeCerts(certs)
      }
    } else {
      const filterOpts = {...defaultFilterOptions}
      const count = await CertsModel.countDocuments({...filterOpts})
      let certs = await CertsModel
        .find({...filterOpts})
        .skip(skip)
        .limit(limit)
        .sort("-issuedOn")
        .populate('issuedTo issuedBy')
      result = {
        count,
        rows: serializeCerts(certs)
      }
    }
    return res.json(result)
  }
)

router.get(
  '/docNo',
  async (req, res, next) => {
    try {
      const {docCode} = req.query
      let company = await CompanyModel.findOne({docCode, shortName: req.user.company.shortName}).populate("designation")

      if (!company) {
        return res.status(400).json({message: 'doc code not found!'})
      }

      const responseObj = {
        docCode: company[docCode],
      }

      return res.json(responseObj)
    } catch (error) {
      console.log(error)
      return res.status(400).json({message: 'Invalid request'})
    }
  }
);

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

      // company main color
      const mainColor = "#"+process.env[`MAIN_COLOR_${req.user.company.shortName.toUpperCase()}`]
      // generate QR Code
      let qrcode = await generateQRCode(req, cert, mainColor)

      // prepare the data that goes into the certificate
      let dataForTemplate = prepareData(req.body, employee, qrcode)

      if (dataForTemplate) {
        // generate base template with headers and footers
        const generateBaseTemplate = require(`../pdf/${company}/generateBaseTemplate`);
        const {doc, writeStream, bodyStartPosition} = await generateBaseTemplate({
          docNo: dataForTemplate.docNo,
          todayDate: dataForTemplate.todayDate,
          qrcode: dataForTemplate.qrcode
        }, certPath, company, mainColor)

        let result;
        if (formType === SALARY_CERTIFICATE_SHORT) {
          result = await generateSC(dataForTemplate, doc, writeStream, bodyStartPosition)
        } else if (formType === SALARY_TRANSFER_LETTER_SHORT) {
          result = await generateSTC(dataForTemplate, doc, writeStream, bodyStartPosition)
        } else if (formType === EXPERIENCE_LETTER_SHORT) {
          result = await generateCOE(dataForTemplate, doc, writeStream, bodyStartPosition)
        }

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

router.get(
  '/:id',
  async (req, res) => {

    try {
      const {id} = req.params
      let cert = await CertsModel.findOne({_id: id}).populate('issuedTo issuedBy')

      if (!cert) {
        return res.status(400).json({message: "Invalid Request Number"})
      }
      return res.json(cert)
    } catch (error) {
      return res.json({message: error.message})
    }
  }
)

router.delete(
  '/:id',
  async (req, res) => {

    try {
      const {id} = req.params
      let cert = await CertsModel.findByIdAndDelete(id)

      if (!cert) {
        return res.status(400).json({message: "Invalid Request Number"})
      }

      return res.send(cert)
    } catch (error) {
      return res.json({message: error.message})
    }
  }
)

router.get(
  '/:id/download',
  async (req, res) => {

    try {
      const {id} = req.params
      const {signed} = req.query

      let cert = await CertsModel.findOne({_id: id})

      if (!cert) {
        return res.status(400).json({message: "Invalid Request Number"})
      }

      let certPath = signed === "true" ? cert.certSignedPath : cert.certUnsignedPath
      const fileName = certPath.replace(/^.*[\\\/]/, '')

      res.setHeader('Content-type', 'application/pdf')
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)

      return fs.createReadStream(certPath).pipe(res);

    } catch (error) {
      return res.json({message: error.message})
    }
  }
)

router.post(
  '/:id/upload',
  async (req, res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(400).json({message: err.message});
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(400).json({message: err.message});
      }
      return res.json(req.cert)
    })
  }
)

module.exports = router;
