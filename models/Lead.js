const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    planName: {
      type: String,
      default: 'General Inquiry',
    },
    planId: {
      type: String,
    },
    age: {
      type: Number,
    },
    sumAssured: {
      type: String,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'called', 'quoted', 'converted', 'lost'],
      default: 'new',
    },
    source: {
      type: String,
      default: 'plan-detail',
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
