const converter = require('number-to-words');
const moment = require("moment");
const QRCode = require('qrcode')
const {
  SALARY_CERTIFICATE_SHORT,
  SALARY_TRANSFER_CERTIFICATE_SHORT,
  EXPERIENCE_LETTER_SHORT,
  CERTIFICATES_OBJ
} = require("../src/constants")

const toTitleCase = (str) => str.replace(/\b\S/g, t => t.toUpperCase())

const generateQRCode = async ({certificateUrl}) => {
  return QRCode.toDataURL(certificateUrl, {color: {dark: "#f88f00"}});
}

function prepareData({docNo, passportNo, formType, ...reqBody}, userObj, qrcode) {
  let finalData = {docNo, passportNo, todayDate: moment().format("Do MMMM YYYY"),}

  if (formType === SALARY_CERTIFICATE_SHORT) {
    return {
      ...finalData,
      salaryInDigits: reqBody.salary,
      salaryInAlpha: toTitleCase(converter.toWords(+reqBody.salary)),
      fullNameWithTitle: userObj.fullNameWithTitle(),
      doj: moment(userObj.doj).format("Do MMMM YYYY"),
      designation: userObj.designation.name,
      nation: reqBody.passportCountry,
      empId: userObj.empId,
      qrcode: qrcode,
    }
  } else if (formType === SALARY_TRANSFER_CERTIFICATE_SHORT) {
    return {
      ...finalData,
      salaryInDigits: reqBody.salary,
      salaryInAlpha: toTitleCase(converter.toWords(+reqBody.salary)),
      fullNameWithTitle: userObj.fullNameWithTitle(),
      doj: moment(userObj.doj).format("Do MMMM YYYY"),
      designation: userObj.designation.name,
      nation: reqBody.passportCountry,
      accNo: reqBody.accNo,
      iban: reqBody.iban,
      empId: userObj.empId,
      qrcode: qrcode,
    }
  } else if (formType === EXPERIENCE_LETTER_SHORT) {
    return {
      ...finalData,
      fullNameWithTitle: userObj.fullNameWithTitle(),
      doj: moment(userObj.doj).format("Do MMMM YYYY"),
      designation: userObj.designation.name,
      empId: userObj.empId,
      qrcode: qrcode,
    }
  }

  return false
}

module.exports = {
  prepareData,
  generateQRCode,
}