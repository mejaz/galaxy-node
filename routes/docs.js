const express = require('express');
const CertsModel = require("../model/certs");
const UserModel = require("../model/user");
const moment = require("moment");
const fs = require("fs");
const router = express.Router();
const multer = require("multer");
const {CERTIFICATES_SHORT_OBJ} = require("../src/constants")
// const {CERTIFICATES_OBJ, SALARY_CERTIFICATE_SHORT} = require("../src/constants");
// const moment = require("moment");
// const path = require("path");
// const {generateQRCode, prepareData} = require("../pdf/helper");
// const generateSC = require("../pdf/templates/scTemplate");
// const express = require("express");

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
      let fileName = `${req.docType.toUpperCase()}_${cert.issuedTo.empId}_${cert._id}_${moment(todayDate).format("DDMMYYYY")}_SIGNED.pdf`
      cert.certSignedPath = `/${req.dirLoc}${fileName}`
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


router.get(
  '/search',
  async (req, res) => {
    const {pageSize, pageNo, ...rest} = req.query

    // let userIds = await UserModel.find({lastName: {'$regex': rest.lastName, '$options': 'i'}}, {_id: 1})
    // userIds = userIds.map(obj => obj._id)
    // console.log(userIds)

    let filterOptions = {
      docNo: rest.docNo,
      // empId: rest.empId,
      // "issuedTo.lastName": {'$regex': rest.lastName, '$options': 'i'}
    }

    let certs = await CertsModel.find(filterOptions).populate('issuedTo issuedBy')

    certs = certs.map(cert => {
      return {
        _id: cert.id,
        docNo: cert.docNo,
        docType: cert.docType,
        issuedTo: cert.issuedTo.fullName(),
        issuedBy: cert.issuedBy.fullName(),
        issuedOn: moment(cert.issuedOn).format("DD-MMM-YYYY"),
        isSignedUploaded: !!cert.certSignedPath,
      }
    })

    // let certs = await CertsModel.find({issuedTo: {$in: userIds}},)
    console.log(certs)
    //
    // if(rest.lastName) {
    //   // add
    // }

    // let docs = await CertsModel.aggregate([
    //   {
    //     $lookup: {
    //       from: 'user',
    //       localField: 'issuedBy',
    //       foreignField: '_id',
    //       as: 'cert_docs',
    //     }},
    //     // { "$unwind": "$cert_docs" }
    // ])
    //
    // console.log(docs.length)

    return res.json(certs)
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

      // certs = certs.map(cert => {
      //   return {
      //     id: cert.id,
      //     docNo: cert.docNo,
      //     docType: cert.docType,
      //     issuedTo: cert.issuedTo.fullName(),
      //     issuedBy: cert.issuedBy.fullName(),
      //     issuedOn: moment(cert.issuedOn).format("DD-MMM-YYYY"),
      //     isSignedUploaded: !!cert.certSignedPath,
      //   }
      // })

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

      return fs.createReadStream(`.${certPath}`).pipe(res);

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
