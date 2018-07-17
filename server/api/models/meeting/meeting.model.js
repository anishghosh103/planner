const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  meetingId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  date: {
    day: Number,
    month: Number,
    year: Number
  },
  startTime: {
    hour: Number,
    minute: Number
  },
  endTime: {
    hour: Number,
    minute: Number
  },
  place: String,
  createdBy: {
    adminId: String,
    adminName: String
  },
  updatedBy: {
    adminId: String,
    adminName: String
  },
  createdAt: Date,
  updatedAt: Date
});

MeetingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  if (!this.createdAt) {
    this.createdAt = this.updatedAt;
  }
  next();
});

module.exports = mongoose.model('Meeting', MeetingSchema);