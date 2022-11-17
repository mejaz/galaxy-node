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

const toTitleCase = (str) => str.replace(/\b\S/g, t => t.toUpperCase())

const generateQRCode = async ({certificateUrl}) => {
  return QRCode.toDataURL(certificateUrl, {color: {dark: "#f88f00"}});
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
}