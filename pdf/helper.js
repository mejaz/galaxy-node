const converter = require('number-to-words');
const moment = require("moment");
const QRCode = require('qrcode')
const nationalities = require("i18n-nationality");
const {
  SALARY_CERTIFICATE_SHORT,
  SALARY_TRANSFER_LETTER_SHORT,
  EXPERIENCE_LETTER_SHORT,
  CERTIFICATES_OBJ
} = require("../src/constants")
const fs = require("fs");
const path = require("path");

const toTitleCase = (str) => str.replace(/\b\S/g, t => t.toUpperCase())

const generateQRCodeUrl = (req, cert) => {
  const protocol = req.protocol
  const host = req.get('host')
  const certificateId = cert._id

  return `${protocol}:\//${host}/docs/view/${certificateId}`
}

const generateQRCode = async (req, cert) => {
  const certificateUrl = generateQRCodeUrl(req, cert)
  return QRCode.toDataURL(certificateUrl, {color: {dark: "#f88f00"}});  // add brand color to db
}

const generateFilename = (formType, employee, dateToday, signed) => {
  const dateFormat = "DDMMYYYY-HHMMSS"
  const signedText = signed ? "SIGNED" : "UNSIGNED"
  return `${formType}_${employee.empId}_${employee.fullName()}_${moment(dateToday).format(dateFormat)}_${signedText}.pdf`
}

const generateCertPath = (formType, company, filename) => {
  let dirPath = `certificates/${company}/${formType.toLowerCase()}`
  !fs.existsSync(dirPath) && fs.mkdirSync(dirPath, {recursive: true});
  return path.join(dirPath, filename)
}

function prepareData({docNo, formType, ...reqBody}, employee, qrcode) {
  const todayDate = moment().format("Do MMMM YYYY")
  let finalData = {
    docNo,
    passportNo: employee.passNo,
    todayDate,
  }

  if (formType === SALARY_CERTIFICATE_SHORT) {
    const salary = reqBody['salary']
    return {
      ...finalData,
      salaryInDigits: salary,
      salaryInAlpha: toTitleCase(converter.toWords(+salary)),
      fullNameWithTitle: employee.fullNameWithTitle(),
      doj: moment(employee.doj).format("Do MMMM YYYY"),
      designation: employee.designation.name,
      nation: nationalities.getName(employee.nationality, 'en'),
      empId: employee.empId,
      qrcode: qrcode,
    }
  } else if (formType === SALARY_TRANSFER_LETTER_SHORT) {
    const salary = reqBody['salary']
    return {
      ...finalData,
      salaryInDigits: salary,
      salaryInAlpha: toTitleCase(converter.toWords(+salary)),
      fullNameWithTitle: employee.fullNameWithTitle(),
      doj: moment(employee.doj).format("Do MMMM YYYY"),
      designation: employee.designation.name,
      nation: nationalities.getName(employee.nationality, 'en'),
      accNo: reqBody.accNo,
      iban: reqBody.iban,
      qrcode: qrcode,
    }
  } else if (formType === EXPERIENCE_LETTER_SHORT) {
    return {
      ...finalData,
      fullNameWithTitle: employee.fullNameWithTitle(),
      doj: moment(employee.doj).format("Do MMMM YYYY"),
      lwd: moment(employee.lwd).format("Do MMMM YYYY"),
      designation: employee.designation.name,
      empId: employee.empId,
      qrcode: qrcode,
    }
  }

  return false
}

module.exports = {
  prepareData,
  generateQRCode,
  generateFilename,
  generateCertPath,
}