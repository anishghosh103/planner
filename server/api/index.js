const express = require('express');
const router = express.Router();

const userRoutes = require('./routes/users.routes');
const meetingRoutes = require('./routes/meetings.routes');

router.get('/', (req, res) => {
  res.send('API Endpoint');
});
router.use('/users', userRoutes);
router.use('/meetings', meetingRoutes);

module.exports = router;