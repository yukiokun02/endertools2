
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

// Create a rate limiter: maximum of 1 request per 5 minutes
const contactLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1, // limit each IP to 1 request per windowMs
  message: { error: 'Too many contact requests, please try again after 5 minutes' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Configure mail transport
const transporter = nodemailer.createTransport({
  // You should set these variables in your environment
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true' || false,
  auth: {
    user: process.env.SMTP_USER || 'mail.enderhost@gmail.com',
    pass: process.env.SMTP_PASSWORD || '',
  },
});

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log contact form submissions
const logContact = (data) => {
  const logFile = path.join(logsDir, 'contact.log');
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(data)}\n`;
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Error writing to contact log:', err);
  });
};

// Handle contact form submissions
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    // Build email
    const mailOptions = {
      from: `"EnderTools Contact" <${process.env.SMTP_USER || 'mail.enderhost@gmail.com'}>`,
      to: 'mail.enderhost@gmail.com',
      subject: `[EnderTools Contact] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #9B87F5;">New Contact Form Submission</h2>
          <hr style="border-top: 1px solid #eee;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="border-top: 1px solid #eee; margin-top: 20px;">
          <p style="color: #888; font-size: 12px;">This email was sent from the EnderTools contact form.</p>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Log submission
    logContact({ name, email, timestamp: new Date() });
    
    // Return success
    return res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};

module.exports = {
  submitContactForm,
  contactLimiter
};
