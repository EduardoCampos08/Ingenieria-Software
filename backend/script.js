document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const requestBody = {
        email: email,
        subject: subject,
        message: message
    };

    try {
        const response = await fetch("http://localhost:3000/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        document.getElementById("responseMessage").textContent = data.message;
    } catch (error) {
        document.getElementById("responseMessage").textContent = "Error al enviar el mensaje.";
        console.error("Error:", error);
    }
});
