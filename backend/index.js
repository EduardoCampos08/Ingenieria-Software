const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Permitir peticiones desde el frontend

// Ruta raíz para evitar el "Cannot GET /"
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tuemail@gmail.com", // Usa tu correo
        pass: "tupassword" // Usa una contraseña de aplicación
    }
});

// Ruta para enviar correo
app.post("/enviar-correo", async (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    const mailOptions = {
        from: "tuemail@gmail.com",
        to: "destino@gmail.com", // Correo donde recibirás los mensajes
        subject: "Nuevo mensaje de contacto",
        text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Correo enviado exitosamente" });
    } catch (error) {
        console.error("Error enviando correo:", error);
        res.status(500).json({ message: "Error al enviar el correo" });
    }
});

// Iniciar servidor en puerto 3000
app.listen(3000, () => console.log("Servidor corriendo en http
