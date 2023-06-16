const Bill = require('../models/Bill');
const nodemailer = require('nodemailer');
const Admin = require('../models/admin');
const updateInvoiceState = async (req, res) => {
  const { invoiceId, adminId } = req.params;
  const { state } = req.body;

  try {
    const invoice = await Bill.findByIdAndUpdate(invoiceId,{ state },{ new: true });
    const admin = await Admin.findById(adminId);
    await Bill.findByIdAndUpdate(invoiceId, {cajero : admin.nombre}, {new: true});
    if (!invoice) {
      return res.status(404).json({ mensaje: 'Factura no encontrada' });
    }

    Bill.findById(invoiceId).then((bill)=>{
    const correo = bill.mail;
    const price = bill.price;
    sendConfirmationEmail(correo, price);
    });
    res.json({ mensaje: 'Estado de factura actualizado', factura: invoice });




  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el estado de la factura' });
  }
};



const sendConfirmationEmail = (correo, price) => {
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
        subject: 'Pago Confirmado',
        text: `
        Querido Cliente,
        
        Rennala restaurante te da las gracias por haber elegido nuestros servicios y por confiar en nosotros para tu reciente visita.
        nos complace informarte que hemos recibido la confirmacion de tu pago total de $ ${price} Pesos.
        En nombre de Rennala restaurante, nos esforzaremos continuamente por brindar una experiencia gastronomica excepcional, desde la calidad de nuestros platos hasta el servicio personalizado
        Tu apoyo nos motiva a seguir mejorando cada dia.
        
        Att,
        
        Rennala Restaurant`,
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


module.exports = updateInvoiceState;
