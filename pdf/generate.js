const PDFDocument = require('pdfkit');
const fs = require('fs');


function generatePdf() {
	try {
// Create a document
		const doc = new PDFDocument({size: 'A4'});

		// Pipe its output somewhere, like to a file or HTTP response
		// See below for browser usage
		doc.pipe(fs.createWriteStream('./certificates/output.pdf'));
		doc.moveDown(10)

		// Embed a font, set the font size, and render some text
		doc
			.font('./pdf/fonts/OPTIFuturaDemiBold.otf')
			.fontSize(12)
			.text('HRD/SC/2022/xxx/AIFIxxx').moveDown(0.5);
		doc
			.font('./pdf/fonts/OPTIFuturaDemiBold.otf')
			.fontSize(12)
			.text('01st January 2022').moveDown(0.5);
		doc
			.font('./pdf/fonts/SansSerifBookFLF.otf')
			.fontSize(11)
			.text('Mr/Ms.. [Name]').moveDown(0.8);
		doc
			.font('./pdf/fonts/SansSerifBookFLF.otf')
			.fontSize(11)
			.text('[Designation]').moveDown(0.8);
		doc
			.font('./pdf/fonts/SansSerifBookFLF.otf')
			.fontSize(11)
			.text('Joining Date: xxx').moveDown(0.8);
		doc
			.font('./pdf/fonts/SansSerifBookFLF.otf')
			.fontSize(11)
			.text('EMP ID: AIFIxxx').moveDown(0.8);

		doc.moveDown(3)

		doc
			.font('./pdf/fonts/OPTIFuturaDemiBold.otf')
			.fontSize(12)
			.text('Subject: Salary Certificate')

		doc.moveDown(2)

		doc
			.font('./pdf/fonts/OPTIFuturaDemiBold.otf')
			.fontSize(12)
			.text('To whomsoever, it may concern', {align: 'center'})

		doc.moveDown(2)

		doc
			.font('./pdf/fonts/SansSerifBookFLF.otf')
			.fontSize(11)
			.text('Dear Sir/Madam,').moveDown(2);

		doc
			.font('./pdf/fonts/SansSerifBookFLF.otf')
			.fontSize(11)
			.text('This is to confirm that Mr./Ms. [Name], holding [Nation] Passport # A/AA xxxxx, is working with us since ', {
				continued: true,
			})
			.font('./pdf/fonts/OPTIFuturaDemiBold.otf')
			.fontSize(12)
			.text('01st January 2018', {
				continued: true,
			})
			.font('./pdf/fonts/SansSerifBookFLF.otf')
			.fontSize(11)
			.text(' in the capacity of a/an', {
				continued: true,
			})
			.font('./pdf/fonts/OPTIFuturaDemiBold.otf')
			.fontSize(12)
			.text(' [Designation].')

		doc.moveDown(2)

		doc
			.font('./pdf/fonts/SansSerifBookFLF.otf')
			.fontSize(11)
			.text('Mr./Ms. [Name] is drawing a monthly salary of Dhs. xxxx /- (UAE Dirham xxxx Only).');

		doc.moveDown(2)

		doc
			.font('./pdf/fonts/SansSerifBookFLF.otf')
			.fontSize(11)
			.lineGap(7)
			.text('This certificate is issued upon the employee’s request for whatever purpose it may serve him/her best and the company holds no liability for any commitment entered vide this certificate.');

		doc.moveDown(2)

		doc
			.font('./pdf/fonts/SansSerifBookFLF.otf')
			.fontSize(11)
			.text('Yours sincerely,');


		console.log(doc.page)

		// Add an image, constrain it to a given size, and center it vertically and horizontally
		// doc.image('./pdf/templates/00_SALARY_CERTIFICATE_AIFI.png', {
		// 	// fit: [doc.page.width - 72, doc.page.height - 72],
		// 	cover: [doc.page.width - 72, doc.page.height - 72],
		// 	align: 'center',
		// 	valign: 'center'
		// });

		// Add another page
		// doc
		// 	.addPage()
		// 	.fontSize(25)
		// 	.text('Here is some vector graphics...', 100, 100);

		// Draw a triangle
		// doc
		// 	.save()
		// 	.moveTo(100, 150)
		// 	.lineTo(100, 250)
		// 	.lineTo(200, 250)
		// 	.fill('#FF3300');

		// Apply some transforms and render an SVG path with the 'even-odd' fill rule
		// doc
		// 	.scale(0.6)
		// 	.translate(470, -380)
		// 	.path('M 250,75 L 323,301 131,161 369,161 177,301 z')
		// 	.fill('red', 'even-odd')
		// 	.restore();

		// Add some text with annotations
		// doc
		// 	.addPage()
		// 	.fillColor('blue')
		// 	.text('Here is a link!', 100, 100)
		// 	.underline(100, 100, 160, 27, {color: '#0000FF'})
		// 	.link(100, 100, 160, 27, 'http://google.com/');

		// Finalize PDF file
		doc.end();
		return true
	} catch (error) {
		console.log(error)
		return false
	}

}


module.exports = generatePdf