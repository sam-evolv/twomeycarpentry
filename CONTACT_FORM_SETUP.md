# Contact Form Email Setup Guide

## Current Status
✅ Contact form is configured and ready for email routing  
✅ Netlify Forms integration is set up  
⏳ Email notifications need to be configured in Netlify dashboard  

## What's Been Configured

### Form Fields
The contact form collects:
- First Name (required)
- Last Name (required)
- Email (required)
- Phone (optional)
- Service Selection (required dropdown)
- Project Message (required textarea)

### Email Recipients
- **Primary:** twomeycarpentry1@gmail.com

### Form Behavior
1. User fills out the form and clicks "Send Enquiry"
2. Form submits to Netlify Forms handler
3. Email notification is sent to Cian's email
4. User sees success message: "Thanks — we'll be in touch within 24 hours."
5. User's email address is captured for follow-up

---

## Netlify Dashboard Configuration (Required)

To activate email notifications, you need to configure Netlify Forms notifications:

### Step 1: Open Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Sign in to your account
3. Select the Twomey Carpentry site

### Step 2: Configure Form Notifications
1. Go to **Site settings → Forms → Form notifications**
2. Click **Add notification → Email notification**
3. Set up email recipients:
   - Add: `twomeycarpentry1@gmail.com`

### Step 3: Test the Form
1. Go to [www.twomeycarpentryandjoinery.ie](https://www.twomeycarpentryandjoinery.ie)
2. Scroll to "Let's Talk" contact section
3. Fill out the form with test data
4. Click "Send Enquiry"
5. Check Cian's email for the notification

---

## How It Works

### When a User Submits the Form:

**User receives:**
- Success message on the website
- Email confirmation (if EmailJS is configured)

**Cian receives:**
- Email notification with form data:
  - Visitor's name
  - Visitor's email address
  - Visitor's phone (if provided)
  - Service they're interested in
  - Detailed project description
  - Link to reply directly

**Fallback Behavior:**
- If email fails, user still sees success message
- Form data is stored in Netlify Dashboard under **Forms → Submissions**
- Can access all submissions manually anytime

---

## Optional: Add Automatic Confirmation Emails

To send automatic confirmation emails to visitors, add EmailJS service:

### EmailJS Setup (Free)
1. Go to [emailjs.com](https://emailjs.com)
2. Sign up for free account
3. Create a Gmail service (or other email provider)
4. Create an email template for contact form
5. Get your **Public Key** and **Service ID**

### Add to Netlify:
1. Go to **Site settings → Environment variables**
2. Add:
   ```
   EMAILJS_PUBLIC_KEY = your_public_key
   EMAILJS_SERVICE_ID = your_service_id
   ```

3. Update form submission script to use EmailJS (code is ready in index.html)

---

## Alternative: Using SendGrid (Professional)

For higher volume, use SendGrid:

1. Create free SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Get API key
3. Store in Netlify environment variables
4. Use Netlify Function to send emails (code provided in `netlify/functions/send-email.js`)

---

## Testing Checklist

- [ ] Contact form loads on the website
- [ ] All form fields are visible and functional
- [ ] Form validation works (required fields)
- [ ] Submit button is clickable
- [ ] Success message appears after submit
- [ ] Email arrives in cian@twomeycarpentry.ie inbox
- [ ] Email contains all submitted data correctly formatted
- [ ] Phone number field is optional (can submit without it)

---

## Troubleshooting

**Form submits but no email received:**
- Check Netlify Forms settings (see Step 2 above)
- Verify email address is correct: `cian@twomeycarpentry.ie`
- Check spam/junk folder

**Form shows error message:**
- Try refreshing the page
- Clear browser cache
- Check console for error messages (F12 → Console)
- Contact Netlify support

**Want to see all submissions:**
- Go to Netlify Dashboard → Site → Forms → contact form
- All submissions are stored with timestamps
- Can see and download submission data anytime

---

## Files Created/Updated

1. **index.html** - Updated form with Netlify Forms configuration
2. **netlify.toml** - Netlify configuration file with form settings
3. **netlify/functions/send-email.js** - Optional: email sending function
4. **INSTAGRAM_SETUP.md** - Instagram feed integration guide
5. **CONTACT_FORM_SETUP.md** - This file

---

## Next Steps

1. **Push code to GitHub** (if not already done):
   ```bash
   git push origin main
   ```

2. **Configure in Netlify Dashboard** (see Step 2 above)

3. **Test the form** on the live website

4. **Verify emails arrive** in Cian's inbox

That's it! The form is now ready to route all enquiries to Cian's email.

---

**Last Updated:** April 14, 2026  
**Site:** www.twomeycarpentryandjoinery.ie  
**Support Email:** twomeycarpentry1@gmail.com
