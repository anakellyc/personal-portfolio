var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const config = require("../config");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Ana's Portfolio" });
});

router.post("/contact", (req, res, next) => {
  let { name, email, phone, message } = req.body;
  console.log(req.body);
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: config.mailuser,
      pass: config.pass
    }
  });
  transporter
    .sendMail({
      from: `"Travel-Mate" <${config.mailuser}>`,
      to: "anakcampos@gmail.com",
      subject: `Website Contact Form: ${name}`,
      text: message,
      replyTo: email,
      html: `<b>From: ${name}, phone: ${phone}</b>
      <br>${message}</br>`
    })
    .then(info => {
      res.status(200).send({ message: "message has been sent" });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
