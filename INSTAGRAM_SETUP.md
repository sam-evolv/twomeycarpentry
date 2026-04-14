# Instagram Feed Integration Setup Guide

## Current Status
✅ Instagram feed framework is installed and ready for activation  
✅ Fallback hardcoded images are displayed while awaiting API credentials  
⏳ Ready for automatic updates once API is configured

## Implementation Options

### Option 1: Instagram Basic Display API (Recommended - Free)
**Best for:** Full control, automatic updates, no third-party services

#### Setup Steps:
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create an app (select "Consumer" template)
3. Add "Instagram Basic Display" product to your app
4. Get your Access Token from the Dashboard
5. Add to your Twomey Carpentry account as an Instagram App User

#### Code Implementation:
In `index.html`, uncomment and update this section:
```javascript
// In the fetchInstagramFeed function
const accessToken = 'YOUR_ACCESS_TOKEN_HERE'; // Get from Facebook Developer Dashboard
const response = await fetch(
  `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`
);

if (!response.ok) throw new Error('Failed to fetch Instagram feed');

const data = await response.json();
const container = document.getElementById('insta-feed-container');

if (container && data.data) {
  container.innerHTML = data.data.slice(0, 6).map((post) => `
    <div class="ig-cell">
      <div class="ig-bg" style="background-image:url('${post.media_url}')"></div>
      <div class="ig-over">
        <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/></svg>
      </div>
    </div>
  `).join('');
}
```

#### Auto-Refresh:
Uncomment this line to refresh every 4 hours:
```javascript
setInterval(fetchInstagramFeed, 4 * 60 * 60 * 1000);
```

---

### Option 2: Elfsight Widget (No-Code - Simplest)
**Best for:** Quick setup, no coding required

#### Setup Steps:
1. Go to [elfsight.com](https://elfsight.com/instagram-feed-widget/)
2. Sign up (free plan available)
3. Create a new Instagram Feed widget
4. Select your @twomeycarpentryandjoinery account
5. Get your Widget ID
6. Replace this in `index.html` head section:
```html
<!-- Replace with your actual widget ID -->
<div class="elfsight-app-YOUR_WIDGET_ID"></div>
```

The script is already included: `<script src="https://apps.elfsight.com/p/platform.js" defer></script>`

---

### Option 3: Instafeed.js (Lightweight - Medium Effort)
**Best for:** Lightweight, open-source, good customization

#### Setup Steps:
1. Include the library: `<script src="https://cdn.jsdelivr.net/npm/instafeed.js@2.0.2/dist/instafeed.min.js"></script>`
2. Get your Instagram Access Token
3. Add this code to the feed script:
```javascript
const feed = new Instafeed({
  accessToken: 'YOUR_ACCESS_TOKEN',
  target: 'insta-feed-container',
  limit: 6,
  template: '<div class="ig-cell"><div class="ig-bg" style="background-image:url(\'{{image}}\')"></div></div>'
});
feed.run();
```

---

## Quick Comparison

| Feature | Option 1 (API) | Option 2 (Elfsight) | Option 3 (Instafeed) |
|---------|-----------------|-------------------|------------------|
| Setup Time | 15 min | 5 min | 10 min |
| Cost | Free | Free (limited) | Free |
| Customization | Full | Limited | Good |
| Auto-Updates | ✓ | ✓ | ✓ |
| Coding Required | Yes | No | Minimal |
| Reliability | High | Medium | Medium |

---

## Current Fallback
The site displays 6 hardcoded images while awaiting API activation:
- bathroom-marble-full.jpg
- kitchen-teal-shaker.jpg
- living-room-alcoves-blue.jpg
- bathroom-plum-vanity.jpg
- kitchen-island-green.jpg
- hallway-storage-green.jpg

These will be automatically replaced with live Instagram posts once any of the above options are configured.

---

## Testing
After implementing your chosen option, test by:
1. Deploying the updated site to Netlify
2. Opening the site in a browser
3. Checking the "Latest from Instagram" section
4. Posting a new photo on @twomeycarpentryandjoinery Instagram account
5. Refreshing the site (or waiting 4 hours for auto-refresh)

---

## Support
If you need help implementing any of these options, let me know which one you prefer and I'll set it up completely.

---

**Last Updated:** April 11, 2026  
**Site:** www.twomeycarpentryandjoinery.ie
