const {startsWithVowel} = require("../helper");

async function generateSTC(
  {
    docNo, fullNameWithTitle, designation, todayDate, doj, passportNo,
    salaryInDigits, salaryInAlpha, nation, qrcode, accNo, iban,
  }, doc, writeStream, bodyStartPosition) {
  try {

    // set the doc cursor positions to write the body
    doc.x = bodyStartPosition.x
    doc.y = bodyStartPosition.y

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text("FAB,").moveDown(0.5);
    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text('Abu Dhabi,').moveDown(0.5);
    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text(`U.A.E.`).moveDown(0.5);

    doc.moveDown(1)

    let certificateSubject = 'Salary Transfer Letter'

    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(12)
      .text(`Subject: ${certificateSubject}`)

    doc
      .moveTo(68, 249)
      .lineTo(68 + doc.widthOfString(certificateSubject), 249)
      .stroke('#000000')

    doc.moveDown(1.5)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text('Dear Sir/Madam,');

    doc.moveDown(1)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .lineGap(7)
      .text('This is to confirm that ', {
        continued: true
      })
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(fullNameWithTitle, {
        continued: true
      })
      .font('./pdf/fonts/GOTHIC.TTF')
      .text(`, holding ${nation} Passport# ${passportNo}, is working with us since `, {
        continued: true
      })
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(doj, {continued: true})
      .font('./pdf/fonts/GOTHIC.TTF')
      .text(` in the capacity of ${startsWithVowel(designation[0])} `, {continued: true})
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(`${designation}.`)

    doc.moveDown(0.2)

    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(12)
      .text(fullNameWithTitle, {
        continued: true
      })
      .font('./pdf/fonts/GOTHIC.TTF')
      .text(' is drawing a monthly salary of ', {
        continued: true
      })
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(`Dhs. ${salaryInDigits}`, {
        continued: true
      })
      .font('./pdf/fonts/GOTHIC.TTF')
      .text(` /- (UAE Dirham ${salaryInAlpha} Only).`);

    doc.moveDown(0.2)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .lineGap(7)
      .text('We confirm that his/her monthly salary will be transferred for the credit of his/her A/C No. ', {
        continued: true
      })
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(`${accNo} (IBAN# AE ${iban})`, {
        continued: true
      })
      .font('./pdf/fonts/GOTHIC.TTF')
      .text(' and undertake not to transfer the\n' +
        'salary to any other bank unless he/she produces a clearance letter from you.')

    doc.moveDown(0.2)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .lineGap(7)
      .text('In case of his/her resignation/termination we will inform ' +
        'the bank and will transfer his/her End of Service benefit and other ' +
        'dues to the above-mentioned account after deducting all dues, if any, from our company.');

    doc.moveDown(0.2)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .lineGap(7)
      .text('This certificate is issued upon the employee’s request ' +
        'for whatever purpose it may serve him/her best and the company ' +
        'holds no liability for any commitment entered vide this certificate.');

    doc.moveDown(0.2)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .lineGap(7)
      .text('Thank you and assure you of our cooperation at all times.')

    // Finalize PDF file
    doc.end();

    // wait for document writing to be complete
    await new Promise((resolve) => writeStream.on('finish', () => resolve()))
    return true

  } catch (error) {
    console.log(error)
    return false
  }

}

module.exports = generateSTC
