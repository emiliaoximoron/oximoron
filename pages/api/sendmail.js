import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Oxímoron <no-reply@oximoron.app>',
      to: [email],
      subject: 'Bienvenida a Oxímoron',
      html: `<p>Hola 👋</p>
             <p>Te registraste exitosamente en <strong>Oxímoron</strong>.</p>
             <p>Tu contraseña es: <strong>${password}</strong></p>
             <p>Podés iniciar sesión en cualquier momento desde www.oximoron.app</p>
             <br/>
             <p>Gracias por confiar 💚</p>`
    });

    console.log("Email enviado:", data);
    res.status(200).json({ message: "Email enviado correctamente." });
  } catch (error) {
    console.error("Error al enviar email:", error);
    res.status(500).json({ message: "Fallo al enviar email." });
  }
}
