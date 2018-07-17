const express = require('express');
const router = express.Router();

const { auth, checkAdmin } = require('../../mids');
const { Meeting } = require('../controllers');

router.get('/:id', auth, Meeting.get);

router.post('/', auth, checkAdmin, Meeting.create);

router.put('/:id', auth, checkAdmin, Meeting.update);

router.delete('/:id', auth, checkAdmin, Meeting.delete);

module.exports = router;