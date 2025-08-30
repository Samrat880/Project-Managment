import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product:{
            name: "Task Manager",
            link: "http://taskmanager.com",
        }
    });
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter =  nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });
    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }
    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed siliently. Make sure that you have provided your MAILTRAP credentials in the .env file");
        console.error("Error",error);
    }
}

const emailVerificationMailgenContent = (Username , verificationUrl) => {
    return {
        body:{
            name:Username,
            intro: "Welcome to our APP! We're very excited to have you on board.",
            action:{
                instructions: "To verify your email, please click here:",
                button:{
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationUrl
                }
            },
            outro:"Need help, or have questions? Just reply to this email, we'd love to help."
        },
    };
};

const forgotPasswordMailgenContent = (Username, passwordResetUrl) => {
  return {
    body: {
      name: Username,
      intro: "You have received this email because a password reset request for your account was received.",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#337ab7",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {emailVerificationMailgenContent, forgotPasswordMailgenContent, sendEmail}