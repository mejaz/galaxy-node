const generateBaseTemplate = require("./generateBaseTemplate");
const {startsWithVowel} = require("../helper");

async function generateCOE({
                            docNo,
                            fullNameWithTitle,
                            designation,
                            todayDate,
                            doj,
                            lwd,
                            empId,
                            passportNo,
                            salaryInDigits,
                            salaryInAlpha,
                            nation,
                            qrcode,
                            company,
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

    let certificateText = 'Certificate of Experience'
    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(12)
      .text(`Subject: ${certificateText}`)

    doc
      .moveTo(68, 286)
      .lineTo(68 + doc.widthOfString(certificateText), 286)
      .stroke('#000000')

    doc.moveDown(2)

    let toWhomItMayConcernText = 'To whomsoever, it may concern'
    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(12)
      .text(toWhomItMayConcernText, {align: 'center'})

    doc
      .moveTo(205, 330)
      .lineTo(205 + doc.widthOfString(toWhomItMayConcernText), 330)
      .stroke('#000000')

    doc.moveDown(2)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text('Dear Sir/Madam,').moveDown(1.5);

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .lineGap(7)
      .text('This is to certify that ', {
        continued: true
      })
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(fullNameWithTitle, {
        continued: true
      })
      .font('./pdf/fonts/GOTHIC.TTF')
      .text(`, was posted as ${startsWithVowel(designation[0])} `, {
        continued: true
      })
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(`${designation} `, {
        continued: true
      })
      .font('./pdf/fonts/GOTHIC.TTF')
      .text(`in ${company.fullName} from`, {
        continued: true
      })
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(` ${doj} `, {
        continued: true
      })
      .font('./pdf/fonts/GOTHIC.TTF')
      .text(`to `, {
        continued: true
      })
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(`${lwd}.`)

    doc.moveDown(1)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .lineGap(7)
      .text('During his/her tenure, we have found that he/she is a dedicated performer. ' +
        'He/She has carried out all of his/her obligations and responsibilities in a dignified manner. ' +
        'He/She is constantly up for new challenges, and he/she has delivered great outcomes ' +
        'in the majority of his/her projects. His/Her actions are responsible for our company’s major ' +
        'accolades. He/She is constantly eager to acquire new talents and swiftly apply them.')

    doc.moveDown(1)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .lineGap(7)
      .text('We wish him/her all the luck in his/her future endeavors.')

    // Finalize PDF file
    doc.end();

    await new Promise((resolve) => writeStream.on('finish', () => resolve()))
    return true

  } catch (error) {
    console.log(error)
    return false
  }

}

module.exports = generateCOE
