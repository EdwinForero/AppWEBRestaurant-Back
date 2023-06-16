const Bill = require('../models/Bill');
const nodemailer = require('nodemailer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const Cocinero = require('../models/cocinero')


const updateInvoiceStateCocinero = async (req, res) => {
  const { invoiceId, cocineroId} = req.params;
  const { state } = req.body;

  try {
    const invoice = await Bill.findByIdAndUpdate(invoiceId, { state }, { new: true });
    const cocinero = await Cocinero.findById(cocineroId);

    await Bill.findByIdAndUpdate(invoiceId, {cocinero : cocinero.nombre}, {new: true});
    if (!invoice) {
      return res.status(404).json({ mensaje: 'Factura no encontrada' });
    }

    Bill.findById(invoiceId).then((bill) => {
      const name = bill.username
      const correo = bill.mail;

      const doc = new PDFDocument();

      // Encabezado de la factura
      doc.rect(50, 50, 500, 400).stroke(); // Dibuja un rectángulo negro como marco
      doc.lineWidth(2); // Establece el ancho de línea en 2 puntos
      doc.strokeColor('black'); // Establece el color de línea en negro

      doc.fontSize(20).text('Factura', { align: 'center', bold: true });
      doc.moveDown();
      doc.fontSize(16).text(`Factura #: ${bill._id}`, { bold: true });
      doc.fontSize(16).text(`Nombre del Cliente: ${bill.username}`, { bold: true });
      doc.fontSize(16).text(`Correo del Cliente: ${bill.mail}`, { bold: true });
      doc.fontSize(16).text(`Pedido : ${bill.descripcion}`, { bold: true });
      doc.fontSize(16).text(`Encargado de la Caja : ${bill.cajero}`, { bold: true });
      doc.fontSize(16).text(`Cocinero : ${bill.cocinero}`, { bold: true });
      doc.fontSize(16).text(`Pedido : ${bill.descripcion}`, { bold: true });
      doc.fontSize(16).text(`Fecha: ${new Date().toLocaleString()}`, { bold: true });
      doc.moveDown();

      // Total de la factura
      doc.fontSize(16).text(`Total: ${bill.price} $`, { align: 'right', bold: true });
      doc.moveDown();

      doc.fontSize(16).text(`Tu satisfacción es nuestro mayor logro. Esperamos con ansias verte nuevamente en nuestro restaurante, donde la buena comida y el excelente servicio siempre te esperan con los brazos abiertos.`, { align: 'Center' });
      doc.moveDown();

      doc.fontSize(16).text("¡Gracias por elegirnos!", { align: 'center' });

      const date = new Date();

      const formattedDate = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).replace(/\//g, '').replace(',', '_').replace(/:/g, '');

      const filePath = `./Facturas/factura_${invoiceId}_${formattedDate}.pdf`;
      doc.pipe(fs.createWriteStream(filePath));
      doc.end();
      

      sendConfirmationEmail(correo,name,filePath);
    })

    res.json({ mensaje: 'Estado de factura actualizado', factura: invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el estado de la factura' });
  }
};


const sendConfirmationEmail = (correo, name, filePath) => {
  // Configurar el transporte de correo
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {

    },
  });

  // Configurar el contenido del correo

  const mailOptions = {
    from: 'godrestaurant13@gmail.com',
    to: correo,
    subject: 'Factura',
    text: `
        Hola ${name},
        
        El pedido esta en camino a tu mesa. Adjuntamos también tu factura de compra.

        Recuerda que estamos trabajando para ofrecer lo mejor para ustedes
        
        Rennala Restaurant`,

    attachments: [
      {
        filename: 'factura.pdf',
        path: filePath,
      },
    ],
  };


  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });
};

module.exports = updateInvoiceStateCocinero;
