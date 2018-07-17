const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  notificationId: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  notificationType: {
    type: String,
    enum: ['created', 'updated', 'deleted'],
    required: true
  },
  meeting: {}
});

module.exports = mongoose.model('Notification', NotificationSchema);