const PDFDocument = require('pdfkit');
const fs = require("fs");

const MARGINS = {
  top: 20,
  bottom: 0,
  left: 18,
  right: 18
}

async function generateBaseTemplate({docNo, todayDate, qrcode}, outputPath, company, mainColor) {
  const LOGO = `./pdf/${company}/logo.png`
  try {
    // Create a document
    const doc = new PDFDocument({size: 'A4', margins: MARGINS});

    // Pipe its output somewhere, like to a file or HTTP response
    let writeStream = fs.createWriteStream(`./${outputPath}`)
    doc.pipe(writeStream);

    doc.image(LOGO, 440, 0, {width: 130})
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

    // certificate body will come here


    // QR code
    doc
      .image(qrcode, 450, 650, {width: 120, height: 120})

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
      .text('Executive Director');

    doc
      .lineGap(0)
      .fillColor(mainColor)
      .font('./pdf/fonts/GOTHICB.TTF')
      .fontSize(9)
      .text('Quantlase Lab L.L.C.', 18, 795,);

    doc
      .fontSize(9)
      .text('Royal Group Building, Ministries Complex', 18, 810,);

    doc
      .fontSize(9)
      .text('www.quantlaselab.com', 450, 810,);

    doc
      .fontSize(9)
      .text('Abu Dhabi, UAE', 18, 825,);

    doc
      .font('./pdf/fonts/GOTHIC.TTF')
      .fillColor("#000")

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