const nodemailer = require('nodemailer');

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'twomeycarpentry1@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse form data
    const params = new URLSearchParams(event.body);
    const firstName = params.get('first-name');
    const lastName = params.get('last-name');
    const email = params.get('email');
    const phone = params.get('phone') || 'Not provided';
    const service = params.get('service');
    const message = params.get('message');

    // Validate required fields
    if (!firstName || !lastName || !email || !service || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Email to Cian
    const mailOptions = {
      from: process.env.EMAIL_USER || 'twomeycarpentry1@gmail.com',
      to: 'twomeycarpentry1@gmail.com',
      subject: `New Project Enquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0C1A2E;">New Project Enquiry</h2>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Interested In:</strong> ${service}</p>

          <h3 style="color: #0C1A2E; margin-top: 20px;">Project Details:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
${message}
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">
            This enquiry was submitted through the Twomey Carpentry & Joinery website contact form.
            <br>Time: ${new Date().toLocaleString('en-IE')}
          </p>
        </div>
      `,
      replyTo: email,
    };

    // Send email to Cian
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message
      }),
    };
  }
};
