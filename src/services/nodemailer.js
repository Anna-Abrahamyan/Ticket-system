import nodemailer from "nodemailer";

const mailToken = makeToken();
function sendMailer(email) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: email,
      subject: "Confirmation",
      text: "Please, click the link to confirm",
      html: `<a href="http://localhost:5000/api/v1/auth/verify/${mailToken}"> Please, click here to confirm. Token ${mailToken} </a>`,
    },
    function (error) {
      if (error) {
        res.status(500).json({ message: "Error on server,please try again." });
        return console.log(error);
      }
      res.status(404).json({ message: "user_with_this_email_not_registered" });
    }
  );
}

function makeToken() {
  let result = [];
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234vfhblkjnjfmbjbhdavgakflblfkjbndgkjfngjnjkl56789";
  let charactersLength = characters.length;
  result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  return result.join("") + characters;
}
const obj = { sendMailer, mailToken };
export default obj;
