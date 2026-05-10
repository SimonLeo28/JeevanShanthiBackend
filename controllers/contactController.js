const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../config/email');

// POST /api/contact
const submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, phone, email, message } = req.body;

    // Save to MongoDB
    const contact = await Contact.create({ name, phone, email, message });

    // Send email (non-blocking — don't fail if email fails)
    try {
      await sendContactEmail({ name, phone, email, message });
      console.log('✅ Email sent successfully for contact:', email);
    } catch (emailErr) {
      console.error('❌ Email send failed:', {
        message: emailErr.message,
        code: emailErr.code,
        command: emailErr.command,
        email: email,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! We will contact you within 24 hours.',
      data: { id: contact._id },
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit. Please try again.' });
  }
};

// GET /api/contact (admin — list all contacts)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitContact, getContacts };
