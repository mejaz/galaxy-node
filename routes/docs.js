const express = require('express');
const CertsModel = require("../model/certs");
const UserModel = require("../model/user");
const moment = require("moment");
const fs = require("fs");
const router = express.Router();
// const {CERTIFICATES_OBJ, SALARY_CERTIFICATE_SHORT} = require("../src/constants");
// const moment = require("moment");
// const path = require("path");
// const {generateQRCode, prepareData} = require("../pdf/helper");
// const generateSC = require("../pdf/templates/scTemplate");
// const express = require("express");


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

      res.setHeader('Content-type', 'application/pdf')
      res.setHeader('Content-Disposition', `attachment; filename=${cert.fileName}`)

      let certPath = signed === "true" ? cert.certSignedPath : cert.certUnsignedPath
      return fs.createReadStream(`.${certPath}`).pipe(res);

    } catch (error) {
      return res.json({message: error.message})
    }
  }
)

module.exports = router;
