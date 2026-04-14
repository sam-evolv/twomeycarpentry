# Contact Form Email Setup Guide - Netlify Functions

## Current Status
✅ Contact form is configured and ready for email sending  
✅ Netlify Function is set up to handle emails  
⏳ Gmail credentials need to be added to Netlify environment variables  

## How It Works Now

The contact form submits directly to a Netlify Function (`/.netlify/functions/contact`) which:
1. Receives the form data
2. Sends an email to twomeycarpentry1@gmail.com with all the details
3. Returns success/error response to the user

---

## Setup Required: Add Gmail Credentials to Netlify

### Step 1: Generate Gmail App Password
Gmail requires an "App Password" for third-party apps to send emails.

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left menu
3. Enable **2-Step Verification** (if not already enabled)
4. Scroll down and find **App passwords** (appears after 2FA is enabled)
5. Select **Mail** and **Windows Computer** (or your device)
6. Google will generate a 16-character password
7. **Copy this password** (you'll need it in the next step)

### Step 2: Add Credentials to Netlify Dashboard
1. Go to [netlify.com](https://netlify.com) and sign in
2. Select your Twomey Carpentry site
3. Go to **Site settings → Environment**
4. Click **Add a variable**
5. Add these two variables:

**Variable 1:**
- Key: `EMAIL_USER`
- Value: `twomeycarpentry1@gmail.com`

**Variable 2:**
- Key: `EMAIL_PASSWORD`
- Value: `[paste the 16-character app password from Step 1]`

6. Click **Save**

### Step 3: Redeploy Site
1. Go to **Deploys** in your Netlify dashboard
2. Click **Trigger deploy → Deploy site**
3. Wait for the build to complete
4. Your contact form is now live!

---

## Testing the Form

1. Go to [www.twomeycarpentryandjoinery.ie](https://www.twomeycarpentryandjoinery.ie)
2. Scroll to "Let's Talk" section
3. Fill out the contact form with test data
4. Click "Send Enquiry"
5. Check twomeycarpentry1@gmail.com inbox for the email

**Expected behavior:**
- Success message: "Thanks — we'll be in touch within 24 hours."
- Email arrives within 10 seconds
- Email contains all form data, nicely formatted

---

## Form Fields Captured

When someone submits the form, you'll receive:
- **Name** (First & Last)
- **Email** (to reply to them)
- **Phone** (optional)
- **Service Type** (what they're interested in)
- **Project Details** (their full message)
- **Timestamp** (when they submitted)

---

## Troubleshooting

**Form shows error after submission:**
- Verify EMAIL_USER and EMAIL_PASSWORD are set in Netlify environment variables
- Check the Gmail app password is correct (16 characters)
- Go to Netlify **Functions** tab and check the logs

**Email not arriving:**
- Check twomeycarpentry1@gmail.com inbox AND spam folder
- Verify the app password was generated correctly
- Try sending again

**Need to change the recipient email:**
- Edit `netlify/functions/contact.js` line 20: `to: 'new-email@example.com'`
- Commit and redeploy

---

## Files Modified

1. **index.html** - Updated form to submit to Netlify Function
2. **netlify/functions/contact.js** - Function that handles email sending
3. **netlify/functions/package.json** - Dependencies (nodemailer)
4. **netlify.toml** - Netlify configuration

---

## Security Notes

- Gmail credentials are stored securely in Netlify (not in code)
- Email passwords are never exposed in frontend code
- Form submission happens server-side, not client-side
- No third-party services needed

---

## Next Steps

1. **Generate Gmail App Password** (Step 1 above)
2. **Add to Netlify environment variables** (Step 2 above)
3. **Trigger a redeploy** (Step 3 above)
4. **Test the form** on the live website

That's it! The form is now fully functional.

---

**Last Updated:** April 14, 2026  
**Site:** www.twomeycarpentryandjoinery.ie  
**Primary Email:** twomeycarpentry1@gmail.com
