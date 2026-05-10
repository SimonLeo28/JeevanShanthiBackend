const express = require('express');
const { body } = require('express-validator');
const { submitContact, getContacts } = require('../controllers/contactController');

const router = express.Router();

const contactValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),
  body('phone').trim().matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian phone number'),
  body('email').optional().isEmail().withMessage('Enter a valid email'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be 10–1000 characters'),
];

router.post('/', contactValidation, submitContact);
router.get('/', getContacts);

module.exports = router;
