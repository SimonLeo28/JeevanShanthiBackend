const express = require('express');
const { body } = require('express-validator');
const { submitLead, getLeads } = require('../controllers/leadController');

const router = express.Router();

const leadValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('phone').trim().matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit phone number'),
  body('email').optional().isEmail().withMessage('Enter a valid email'),
];

router.post('/', leadValidation, submitLead);
router.get('/', getLeads);

module.exports = router;
