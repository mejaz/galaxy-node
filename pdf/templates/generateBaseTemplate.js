const PDFDocument = require('pdfkit');
const fs = require("fs");

const MARGINS = {
  top: 20,
  bottom: 0,
  left: 18,
  right: 18
}

const AIFI_LOGO = './pdf/logo.png'

async function generateBaseTemplate({docNo, todayDate, qrcode}, outputPath) {
  try {
    // Create a document
    const doc = new PDFDocument({size: 'A4', margins: MARGINS});

    // Pipe its output somewhere, like to a file or HTTP response
    let writeStream = fs.createWriteStream(`./${outputPath}`)
    doc.pipe(writeStream);

    doc.image(AIFI_LOGO, 440, 0, {width: 130})
    doc.moveDown(6)

    // Embed a font, set the font size, and render some text
    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(12)
      .text(docNo).moveDown(0.5);
    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(12)
      .text(todayDate).moveDown(1);

    const bodyStartPosition = {
      x: doc.x, y: doc.y
    }

    console.log("--bodyStartPosition--", bodyStartPosition)

    // certificate body will come here


    // QR code
    doc
      .image(qrcode, 450, 650, {width: 120, height: 120})

    // doc.moveTo(618, 650)
    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text('Yours sincerely,', 18, 650);

    doc.moveDown(5)


    doc
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(14)
      .lineGap(7)
      .text('Sheraz Raza Siddiqui')

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(12)
      .text('C.E.O.');

    // doc footer
    doc
      .lineGap(0)
      .moveTo(18, 801)
      .lineTo(570, 801)
      .stroke('#f88f00')

    doc
      .image(AIFI_LOGO, 87, 802, {width: 20})
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(9)
      .text('AIFI Technologies LLC • Office Unit 1-8, Masdar City, Abu Dhabi, U.A.E • P.O. Box: 53543', 107, 810,);

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fontSize(9)
      .text(' Tel: (+971) 2 628 2583 • email: info@aifitechnologies.com', 170, 825,);

    return {
      writeStream,
      doc,
      bodyStartPosition
    }

  } catch (error) {
    console.log(error)
    return false
  }

}

module.exports = generateBaseTemplate