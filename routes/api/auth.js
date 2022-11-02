const express = require('express');

const ctrl = require('../../controllers/auth');

const { validationBody, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

// signup
router.post('/signup', validationBody(schemas.registerSchema), ctrl.register);

// signin
router.post('/login', validationBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

router.get('/verify/:verificationToken', ctrl.verifyEmail);
router.post('/verify', validationBody(schemas.verifyEmailSchema), ctrl.resendVerifyEmail);

router.get('/logout', authenticate, ctrl.logout);

module.exports = router;

//
