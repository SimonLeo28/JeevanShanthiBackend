const { validationResult } = require('express-validator');
const Lead = require('../models/Lead');
const { sendLeadEmail } = require('../config/email');

// POST /api/leads
const submitLead = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, phone, email, planName, planId, age, sumAssured, message, source } = req.body;

    const lead = await Lead.create({
      name, phone, email, planName, planId, age, sumAssured, message,
      source: source || 'plan-detail',
    });

    try {
      await sendLeadEmail({ name, phone, planName: planName || 'General Inquiry' });
      console.log('✅ Lead email sent successfully for:', phone);
    } catch (emailErr) {
      console.error('❌ Lead email failed:', {
        message: emailErr.message,
        code: emailErr.code,
        phone: phone,
      });
    }

    res.status(201).json({
      success: true,
      message: "Quote request received! We'll call you within 24 hours.",
      data: { id: lead._id },
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit request.' });
  }
};

// GET /api/leads (admin)
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitLead, getLeads };
