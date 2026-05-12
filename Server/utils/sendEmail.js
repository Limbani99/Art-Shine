const nodemailer = require("nodemailer")
const sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: `"Art Shine" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully", info.response);
    } catch (error) {
        console.log(error);
    }
}
module.exports = sendEmail;


// sendEmail function = Post Office

// transporter    = The delivery person (Gmail)
// mailOptions    = The envelope (to, from, subject, content)
// sendMail()     = Actually delivering the letter