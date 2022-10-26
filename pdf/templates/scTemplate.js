const PDFDocument = require('pdfkit');
const fs = require('fs');


function generateSC({
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
                    }, outputPath) {
  try {
    // Create a document
    const doc = new PDFDocument({
      size: 'A4', margins: {
        top: 20,
        bottom: 0,
        left: 18,
        right: 18
      }
    });

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(`.${outputPath}`));

    doc.image('./pdf/logo.png', 425, 10, {width: 130})
    doc.moveDown(8)

    // Embed a font, set the font size, and render some text
    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(12)
      .text(docNo).moveDown(0.5);
    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(12)
      .text(todayDate).moveDown(0.5);
    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text(fullNameWithTitle).moveDown(0.5);
    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text(designation).moveDown(0.5);
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

    // doc.underline(82, 264, doc.widthOfString(salaryCertificateText), doc.currentLineHeight(), {
    //   color: '#000'
    // })
    doc
      .moveTo(68, 308)
      .lineTo(68 + doc.widthOfString(salaryCertificateText), 308)
      .stroke('#000000')

    doc.moveDown(2)

    let toWhomItMayConcernText = 'To whomsoever, it may concern'
    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(12)
      .text(toWhomItMayConcernText, {align: 'center'})

    doc
      .moveTo(205, 352)
      .lineTo(205 + doc.widthOfString(toWhomItMayConcernText), 352)
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
      .text('This is to confirm that ', {
        continued: true
      })
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(fullNameWithTitle, {
        continued: true
      })
      .font('./pdf/fonts/GOTHIC.TTF')
      .text(`, holding ${nation} Passport # ${passportNo}, is working with us since `, {
        continued: true
      })
      .font('./pdf/fonts/GOTHICB.TTF')
      .text(doj, {continued: true})
      .font('./pdf/fonts/GOTHIC.TTF')
      .text(' in the capacity of a ', {continued: true})
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
      .text('This certificate is issued upon the employee’s request for whatever purpose it may serve him/her best and the company holds no liability for any commitment entered vide this certificate.');

    doc.moveDown(2)

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text('Yours sincerely,');


    doc.moveDown(4)

    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(14)
      .text('Sheraz Raza Siddiqui')

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text('C.E.O.');

    doc
      .image(qrcode, 450, 640, {width: 80, height: 80})


    doc
      .moveTo(18, 801)
      .lineTo(570, 801)
      .stroke('#f88f00')

    doc
      .image('./pdf/logo.png', 87, 802, {width: 20})
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(9)
      .text('AIFI Technologies LLC • Street 9, Villa 13, Khalifa City A, Abu Dhabi, U.A.E • P.O. Box: 53543', 107, 810,);

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(9)
      .text(' Tel: (+971) 2 627 4379 • email: info@aifitechnologies.com', 170, 825,);

    // Finalize PDF file
    doc.end();
    return true
  } catch (error) {
    console.log(error)
    return false
  }

}

module.exports = generateSC
