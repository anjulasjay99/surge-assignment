const nodemailer = require("nodemailer");

//setting up email account
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "desiree.spinka@ethereal.email",
    pass: "fy19qeYDzVNP1Tv2fm",
  },
});

//send email to the user
const sendMail = (email, password) => {
  const mail = {
    from: "<no-reply@testaccount.com>",
    to: email,
    subject: "Login to your account",
    html: `<p>Your account has been created. Credentials are given below.</p><p>Email : ${email}<br />Password : ${password}</p><p>Please visit <a href='http://localhost:3000/login'>http://localhost:3000/login</a> to login to your account</p>`,
  };
  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent - " + info.response);
    }
  });
};

module.exports = { sendMail };
