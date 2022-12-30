const generateBaseTemplate = require("./generateBaseTemplate");
const {startsWithVowel} = require("../helper");

async function generateSC({
                            docNo,
                            fullNameWithTitle,
                            designation,
                            todayDate,
                            doj,
                            empId,
                            passportNo,
                            salaryInDigits,
                            salaryInAlpha,
                            nation,
                            qrcode,
                            addressTo,
                          }, doc, writeStream, bodyStartPosition) {
  try {
    // get the base template with header and footer
    // const {doc, writeStream, bodyStartPosition} = await generateBaseTemplate({
    //   docNo, todayDate, qrcode
    // }, outputPath, company)

    // set the doc cursor positions to write the body
    doc.x = bodyStartPosition.x
    doc.y = bodyStartPosition.y

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text(`Name: ${fullNameWithTitle}`).moveDown(0.5);
    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text(`Designation: ${designation}`).moveDown(0.5);
    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text(`Joining Date: ${doj}`).moveDown(0.5);
    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text(`EMP ID: ${empId}`).moveDown(0.5);

    doc.moveDown(2)

    let salaryCertificateText = 'Salary Certificate'
    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(12)
      .text(`Subject: ${salaryCertificateText}`)

    doc
      .moveTo(68, 286)
      .lineTo(68 + doc.widthOfString(salaryCertificateText), 286)
      .stroke('#000000')

    doc.moveDown(2)

    if (addressTo) {
      doc
        .font('./pdf/fonts/GOTHICB.TTF')
        .fontSize(12)
        .text(`To: ${addressTo}`)
    } else {
      let toWhomItMayConcernText = 'To whomsoever, it may concern'
      doc
        .font('./pdf/fonts/GOTHICB.TTF')
        .fontSize(12)
        .text(toWhomItMayConcernText, {align: 'center'})

      doc
        .moveTo(205, 330)
        .lineTo(205 + doc.widthOfString(toWhomItMayConcernText), 330)
        .stroke('#000000')
    }

    doc.moveDown(2)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text('Dear Sir/Madam,').moveDown(1.5);

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

    doc.moveDown(1)

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

    doc.moveDown()

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .lineGap(7)
      .text('This certificate is issued upon the employee’s request for ' +
        'whatever purpose it may serve him/her best and the company holds ' +
        'no liability for any commitment entered vide this certificate.');


    // Finalize PDF file
    doc.end();

    await new Promise((resolve) => writeStream.on('finish', () => resolve()))
    return true

  } catch (error) {
    console.log(error)
    return false
  }

}

module.exports = generateSC
