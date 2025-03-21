const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado correctamente');
        return { success: true, message: 'Correo enviado correctamente.' };
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return { success: false, message: 'Error al enviar el correo.' };
    }
};

module.exports = sendEmail;
