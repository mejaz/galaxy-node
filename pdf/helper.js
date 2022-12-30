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

// const generateQRCodeUrl = (req, cert) => {
//   const protocol = req.protocol
//   const host = req.get('host')
//   const certificateId = cert._id
//
//   return `${protocol}:\//${host}/docs/view/${certificateId}`
// }

const generateQRCode = async (s3CertPath, mainColor) => {
  return QRCode.toDataURL(s3CertPath, {color: {dark: mainColor}});  // add brand color to db
}

const generateFilename = (formType, employee, dateToday, signed) => {
  const dateFormat = "DDMMYYYYHHMMSS"
  const signedText = signed ? "SIGNED" : "UNSIGNED"
  return `${formType}_${employee.empId}_${employee.fullNameWithUnderscore()}_${moment(dateToday).format(dateFormat)}_${signedText}.pdf`
}

const generateCertPath = (formType, company, filename) => {
  let dirPath = `certificates/${company}/${formType.toLowerCase()}`
  !fs.existsSync(dirPath) && fs.mkdirSync(dirPath, {recursive: true});
  return path.join(dirPath, filename)
}

const generateS3CertPath = (formType, company, filename) => {
  let filePostFix = `${company}/${formType.toUpperCase()}/${filename}`
  return {
    s3CertPath: `${process.env.AWS_FILE_PATH_PRE_FIX}/${filePostFix}`,
    postFix: filePostFix
  }
}

function prepareData({docNo, formType, ...reqBody}, employee, qrcode, company) {
  const todayDate = moment().format("Do MMMM YYYY")
  let finalData = {
    docNo,
    passportNo: employee.passNo,
    todayDate,
    company,
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
      addressTo: reqBody.addressTo,
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

const startsWithVowel = (char) => {
  let vowel = ['a', 'e', 'i', 'o', 'u']
  return vowel.indexOf(char.toLowerCase()) > -1 ? "an" : 'a'
}

module.exports = {
  prepareData,
  generateQRCode,
  generateFilename,
  generateCertPath,
  generateS3CertPath,
  startsWithVowel,
}