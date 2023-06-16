const User = require('../models/user');
const Bill = require('../models/Bill');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const fs = require('fs');
const Cart = require('../models/Cart');

const Pay = async (req, res) => {
  try {
    const { userId } = req.params;
    const { price } = req.body;
    let desc = '';
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const userCart = await Cart.find({user: userId});

    desc = userCart.map(item => `${item.amount} ${item.name}`).join(', ');
    

    const bill = new Bill({
      user: userId,
      username: user.nombre,
      mail: user.correo,
      price: price,
      descripcion: desc,
    });

    const savedBill = await bill.save();

    res.json({ mensaje: 'Factura Creada ' + savedBill.date  });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {

      },
    });

    const mailOptions = {
      from: 'godrestaurant13@gmail.com',
      to: user.correo,
      subject: 'Pedido en camino',
      text: `
        Hola ${user.nombre},
        
        Su pedido esta en proceso de preparación en nuestra cocina. En unos momentos le enviaremos actualización.

        Agradecemos sinceramente su preferencia y esperamos que disfrute de su comida en breve.
         
        Rennala Restaurant`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.log('Error al procesar el pago:', error);
    res.status(500).json({ mensaje: 'Error al procesar el pago' });
  }
};

module.exports = Pay;
