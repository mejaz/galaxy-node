const converter = require('number-to-words');
const moment = require("moment");
const QRCode = require('qrcode')

const toTitleCase = (str) => str.replace(/\b\S/g, t => t.toUpperCase())

const generateQRCode = async ({certificateUrl}) => {
  return QRCode.toDataURL(certificateUrl, {color: {dark: "#f88f00"}});
}

function prepareData({docNo, passportNo, formType, ...reqBody}, userObj, qrcode) {
  let finalData = {docNo, passportNo, todayDate: moment().format("Do MMMM YYYY"),}

  if (formType === "SC") {
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
  }

  return false
}

module.exports = {
  prepareData,
  generateQRCode,
}