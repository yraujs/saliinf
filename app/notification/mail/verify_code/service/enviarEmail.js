const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

console.log(process.env.MAIL_APP_PASS);
console.log(process.env.USER_MAIL);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.MAIL_APP_PASS
    }
});

async function enviarEmail(email, code){

    try{
        console.log('contatando o transporter');

        const emailDestino = email;

        await transporter.sendMail({
            from: process.env.USER_MAIL,
            to: emailDestino,
            subject: "Código de Verificação",
            text: `Seu código: ${code}`
        });

        console.log('email enviado disk');

        return true;

    }catch(erro){

        console.log(erro);

        return false;

    }
}

module.exports = enviarEmail;