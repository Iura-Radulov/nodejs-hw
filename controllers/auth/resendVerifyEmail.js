const { User } = require('../../models/user');

const sendEmail = require('../../sendEmail');
const { createError } = require('../../errors');

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, 'missing required field email');
    }
    if (user.verify) {
      throw createError(400, 'Verification has already been passed');
    }
    const mail = {
      to: email,
      subject: 'Подтверждение регистрации на сайте',
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Нажмите для подтверждения email</a>`,
    };
    await sendEmail(mail);
    res.json({
      message: 'Email verify resend',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
