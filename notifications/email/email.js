const mailer = require("nodemailer");

const { options, appAccount } = require("../config");

/**
 * send email and return the new sent email info
 *
 * @input email([String]): user emails in array of strings
 * @input content(String): email content object that contain text and html
 * @input emailSubject(String): email subject
 *
 * @output promise which is resolved to info
 */
const send = async (emails, content, emailSubject) => {
  try {
    const mailOptions = {
      from: `Анна Блум <${appAccount}>`,
      to: emails,
      subject: emailSubject,
      text: content.text,
      html: content.html,
    };
    if (!options.transport) {
      throw "transport not found!";
    }
    const notifier = mailer.createTransport(options.transport);
    return await notifier.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  send,
};
