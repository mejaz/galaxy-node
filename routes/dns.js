const express = require('express');
const CertsModel = require("../model/certs");
const UserModel = require("../model/user");
const moment = require("moment");
const DesignationModel = require("../model/designation");
const router = express.Router();



router.get(
  '/',
  async (req, res) => {
    let dns = await DesignationModel.find({})
    return res.json(dns)
  }
)

router.post(
  '/add',
  async (req, res) => {

    try {
      const {newDesignation} = req.body

      if(newDesignation.trim().length === 0) {
        return res.status(400).send({message: "Invalid Designation"})
      }

      let dns = new DesignationModel({
        name: newDesignation
      })

      dns = await dns.save()

      return res.json(dns)
    } catch (error) {
      return res.status(400).json({message: error.message})
    }
  }
)

router.delete(
  '/:id',
  async (req, res) => {

    try {
      const {id} = req.params

      if(!id) {
        return res.status(400).send({message: "Invalid id"})
      }

      let dns = await DesignationModel.findByIdAndDelete(id)

      return res.json(dns)
    } catch (error) {
      return res.status(400).json({message: error.message})
    }
  }
)

module.exports = router;
