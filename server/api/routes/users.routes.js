const express = require('express');
const router = express.Router();

const { auth, notAuth, checkAdmin } = require('../../mids');
const { User } = require('../controllers');

router.get('/', auth, checkAdmin, User.getAll);
router.get('/notifications', auth, User.getNotifications);
router.get('/auth-status', auth, User.getAuthStatus);
router.get('/:id', auth, User.getById);
router.get('/:id/meetings', auth, User.getMeetings);

router.post('/login', notAuth, User.login);
router.post('/signup', notAuth, User.signup);
router.post('/logout', auth, User.logout);
router.post('/forgot-password', notAuth, User.forgotPassword);

router.put('/:id/activate', User.activate);
router.put('/reset-password', User.resetPassword);

router.delete('/notifications/:notificationId', auth, User.deleteNotification);
router.delete('/notifications', auth, User.deleteAllNotifications);

module.exports = router;