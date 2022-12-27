const express = require('express');
const DesignationModel = require("../model/designation");
const router = express.Router();

router.get(
  '/',
  async (req, res) => {
    let dns = await DesignationModel.find({name: {$not: {'$regex': "admin", '$options': "i"}}})
    return res.json(dns)
  }
)

router.post(
  '/add',
  async (req, res) => {

    try {
      const {newDesignation} = req.body

      if(newDesignation.trim().length === 0) {
        return res.status(400).json({message: "Invalid Designation"})
      }

      let dns = new DesignationModel({
        name: newDesignation
      })

      dns = await dns.save()

      return res.status(201).json({success: true, message: `Designation "${dns.name}" successfully added`})
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

      return res.status(202).json({success: true, message: `Designation "${dns.name}" successfully deleted`})
    } catch (error) {
      return res.status(400).json({message: error.message})
    }
  }
)

module.exports = router;
