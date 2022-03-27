const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
admin.initializeApp();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sarafatharva1234@gmail.com",
    pass: "Atharva@123",
  },
});
exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const dest = req.query.dest;
    const uid=req.query.uid;
    const mailOptions = {
      from: "Uber Hacktag <gnn.sss21@gmail.com>",
      to: dest,
      subject: "Uber Cab Invite Link",
      html: `Dear User, Here is the link to your cab https://uber-hack12.herokuapp.com/${uid}`,
    };
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Sended");
    });
  });
});
