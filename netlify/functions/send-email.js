const nodemailer = require('nodemailer');

// Configure your email service
// Using Netlify environment variables
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.handler = async (event, context) => {
  // Only handle POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Extract form data
    const { firstName, lastName, email, phone, service, message } = data;

    // Email to Cian
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'cian@twomeycarpentry.ie',
      cc: 'twomeycarpentry1@gmail.com',
      subject: `New Project Enquiry from ${firstName} ${lastName}`,
      html: `
        <h2>New Project Enquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Service Interested In:</strong> ${service}</p>
        <p><strong>Project Details:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from Twomey Carpentry & Joinery website</small></p>
      `,
    };

    // Send confirmation email to customer
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your enquiry — Twomey Carpentry & Joinery',
      html: `
        <h2>Thank you for your enquiry</h2>
        <p>Hi ${firstName},</p>
        <p>We've received your project enquiry and appreciate you getting in touch. We'll review your request and get back to you within 24 hours.</p>
        <p><strong>Your details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Service:</strong> ${service}</li>
          ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
        </ul>
        <p>If you have any urgent questions, feel free to call us at <strong>086 349 5327</strong>.</p>
        <p>Best regards,<br><strong>Twomey Carpentry & Joinery Team</strong><br>Cork, Ireland</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationMailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Emails sent successfully' }),
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
};
