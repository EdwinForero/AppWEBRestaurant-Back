const User = require('../models/user');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    User.findOne({ correo }).then((user) => {

        if (user) {
            return res.json({ message: 'Ya existe un usuario con ese correo' });
        } else if (!nombre || !correo || !contraseña) {
            return res.json({ message: 'Complete todos los campos' });
        } else {
            const newUser = new User({
                nombre,
                correo,
                contraseña,
            });
            newUser
                .save()
                .then((user) => {
                    // Enviar correo de confirmación
                    sendConfirmationEmail(correo);
                    res.json({ message: 'Usuario creado' });
                })
                .catch((error) => console.error(error));
        }
    });
};

// Función para enviar el correo de confirmación
const sendConfirmationEmail = (correo) => {
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
        subject: 'Confirmación de registro',
        text: 'Gracias por registrarte. Tu cuenta ha sido creada exitosamente.',
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

module.exports = register;
