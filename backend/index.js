const express = require('express');
const sendEmail = require('./mailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware para parsear datos en JSON
app.use(express.json());

// Ruta para enviar correos
app.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    const response = await sendEmail(to, subject, message);
    res.json(response);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
