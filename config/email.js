const nodemailer = require('nodemailer');

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS?.replace(/\s/g, ''), // Remove spaces from app password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
  return transporter;
};

const sendContactEmail = async ({ name, phone, email, message }) => {
  
  const transporter = createTransporter();
  const agentEmail = process.env.AGENT_EMAIL || process.env.EMAIL_USER;

  // Debug: Verify transporter connection
  try {
    await transporter.verify();
    console.log('✅ Nodemailer transporter verified successfully');
  } catch (verifyErr) {
    console.error('❌ Nodemailer transporter verification failed:', verifyErr.message);
    throw new Error(`Email service not configured: ${verifyErr.message}`);
  }

  // Email to agent
  await transporter.sendMail({
    from: `"Jeevan Shanthi Website" <${process.env.EMAIL_USER}>`,
    to: agentEmail,
    subject: `📩 New Contact Form Submission – ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1a5276, #2e86c1); padding: 32px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">New Contact Enquiry</h1>
          <p style="color: rgba(255,255,255,0.75); margin: 8px 0 0;">Jeevan Shanthi LIC Services</p>
        </div>
        <div style="padding: 32px; background: #fff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 14px;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #1a202c;">${name}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #1a5276;"><a href="tel:${phone}" style="color: #1a5276;">${phone}</a></td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 14px;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a202c;">${email || 'Not provided'}</td></tr>
            <tr><td style="padding: 12px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Message</td><td style="padding: 12px 0; color: #374151; line-height: 1.6;">${message}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #eaf4fb; border-radius: 8px; text-align: center;">
            <a href="tel:${phone}" style="display: inline-block; background: #1a5276; color: #fff; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px;">📞 Call ${name} Now</a>
          </div>
        </div>
        <div style="padding: 16px 32px; background: #f8f9fb; text-align: center; font-size: 12px; color: #9ca3af;">
          Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
        </div>
      </div>
    `,
  });

  // Auto-reply to user if email provided
  if (email) {
    await transporter.sendMail({
      from: `"Jeevan Shanthi LIC Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '✅ We received your inquiry – Jeevan Shanthi LIC Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a5276, #2e86c1); padding: 32px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 12px;">🛡️</div>
            <h1 style="color: #fff; margin: 0; font-size: 24px;">Thank You, ${name}!</h1>
          </div>
          <div style="padding: 32px; background: #fff;">
            <p style="color: #374151; line-height: 1.7; font-size: 16px;">We've received your inquiry and our expert advisor will contact you <strong>within 24 hours</strong> to discuss your insurance needs.</p>
            <div style="background: #eaf4fb; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0; color: #1a5276; font-weight: 600;">📞 For urgent queries, call us directly:</p>
              <p style="margin: 8px 0 0; font-size: 20px; color: #1a5276; font-weight: 700;">+91 98765 43210</p>
            </div>
            <p style="color: #6b7280; font-size: 14px;">Or WhatsApp us at <a href="https://wa.me/919876543210" style="color: #25d366;">+91 98765 43210</a></p>
          </div>
          <div style="padding: 16px 32px; background: #f8f9fb; text-align: center; font-size: 12px; color: #9ca3af;">
            Jeevan Shanthi LIC Insurance Services | Rajamahendravaram, Andhra Pradesh
          </div>
        </div>
      `,
    });
  }
};

const sendLeadEmail = async ({ name, phone, planName }) => {
  const transporter = createTransporter();
  const agentEmail = process.env.AGENT_EMAIL || process.env.EMAIL_USER;

  await transporter.sendMail({
    from: `"Jeevan Shanthi Website" <${process.env.EMAIL_USER}>`,
    to: agentEmail,
    subject: `🎯 New Quote Request – ${planName} – ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #c9a227, #e0b840); padding: 32px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 22px;">New Quote Request</h1>
          <p style="color: rgba(255,255,255,0.85); margin-top: 8px;">Plan: <strong>${planName}</strong></p>
        </div>
        <div style="padding: 32px;">
          <p style="color: #374151;"><strong>${name}</strong> is interested in <strong>${planName}</strong> and has requested a quote.</p>
          <p style="font-size: 20px; color: #1a5276; font-weight: 700;">📞 ${phone}</p>
          <a href="tel:${phone}" style="display: inline-block; background: #c9a227; color: #fff; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600;">Call Now</a>
        </div>
      </div>
    `,
  });
};

module.exports = { sendContactEmail, sendLeadEmail };
