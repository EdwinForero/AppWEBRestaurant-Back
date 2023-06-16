const User = require("../models/user");
const nodemailer = require('nodemailer');

const recover = async (req, res) => {

    const { correo } = req.body;
    const pass = "123456"
    const esta = await User.findOne({correo});

    if(esta){
        res.json({mensaje: "Contraseña actualizada"});
        sendConfirmationEmail(correo);
        await User.updateOne({correo: correo}, {contraseña: pass});
    }else{
        res.json({mensaje: "No se encuentra el Correo"})
    }
}

// Función para enviar el correo de confirmación
const sendConfirmationEmail = (correo) => {
    const pass = "123456"
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
        subject: 'Cambio de contraseña',
        text: `Tu nueva contraseña es ${pass}, recuerda ingresar y actualizar informacion`,
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


module.exports = recover;
