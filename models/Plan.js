const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    planId: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ['endowment', 'term', 'money-back', 'whole', 'pension'],
      required: true,
    },
    icon: { type: String, default: '🛡️' },
    name: { type: String, required: true },
    tag: { type: String },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    eligibility: { type: String },
    term: { type: String },
    premiumModes: { type: String },
    minAge: { type: Number },
    maxAge: { type: Number },
    minSumAssured: { type: String },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);
