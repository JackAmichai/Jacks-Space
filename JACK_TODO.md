# Jack's Portfolio - Setup TODO List

## ✅ Completed
- [x] AI Chatbot (Cloud) with RAG using Gemini 2.0 Flash
- [x] Recruiter Mode toggle
- [x] Accessibility Panel (High Contrast, Large Text, Reduce Motion)
- [x] PWA Support (manifest.json, service worker)
- [x] JSON-LD Schema for SEO
- [x] Keyboard Shortcuts (?, R, /)
- [x] Project Case Study Modals
- [x] Availability Badge
- [x] Why Hire Me TL;DR Card
- [x] Print-friendly styles
- [x] Airtable integration code for Contacts & Analytics

---

## 🔧 Action Required (One-Time Setup)

### 1. Airtable Database Setup
**Time: ~10 minutes**

1. Go to [airtable.com](https://airtable.com) and sign up (free)
2. Create a new base called **"Portfolio Website"**
3. Create **Table 1: `Contacts`** with fields:
   - `Name` (Single line text)
   - `Email` (Email)
   - `Message` (Long text)
   - `Timestamp` (Date - include time)
   - `Status` (Single select: New, Replied, Archived)

4. Create **Table 2: `Analytics`** with fields:
   - `Timestamp` (Date - include time)
   - `Page` (Single line text)
   - `Event` (Single line text)
   - `UserAgent` (Long text)
   - `Referrer` (URL)
   - `IP` (Single line text)

5. Get API Token:
   - Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
   - Create token with scopes: `data.records:read`, `data.records:write`
   - Grant access to your "Portfolio Website" base
   - Copy the token (starts with `pat...`)

6. Get Base ID:
   - Open your base, look at URL: `airtable.com/appXXXXXXXX/...`
   - Copy the `appXXXXXXXX` part

### 2. Vercel Environment Variables
**Time: ~2 minutes**

Go to [vercel.com](https://vercel.com) → Your Project → Settings → Environment Variables

Add these variables:

| Variable | Value |
|----------|-------|
| `AIRTABLE_API_KEY` | Your Airtable token (`pat...`) |
| `AIRTABLE_BASE_ID` | Your Base ID (`app...`) |

Then click **Redeploy** from the Deployments tab.

### 3. OpenRouter API Key (Already Done?)
Your current key: `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`

If chatbot stops working:
1. Go to [openrouter.ai](https://openrouter.ai)
2. Check credits/billing
3. Generate new key if needed
4. Update in `api/chat.js`

---

## 📋 Optional Enhancements (Future)

- [ ] Add email notifications via Resend when contact form submitted
- [ ] Set up Airtable automation to email you on new contact
- [ ] Add Google Analytics 4 for more detailed tracking
- [ ] Create custom 192x192 and 512x512 PNG icons for PWA (currently using me.jpeg)
- [ ] Add Calendly embed/link button
- [ ] A/B test different hero copy

---

## 🔗 Important Links

- **Live Site**: https://new-personal-website-topaz.vercel.app
- **GitHub Repo**: https://github.com/JackAmichai/NewPersonalWebsite
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Airtable**: https://airtable.com
- **OpenRouter**: https://openrouter.ai
- **Your Email**: jackamichai@gmail.com

---

## 🚨 Troubleshooting

### Chatbot says "trouble connecting"
- Check OpenRouter credits at openrouter.ai
- Verify API key in `api/chat.js`
- Check Vercel function logs for errors

### Contact form not saving
- Verify Airtable env vars in Vercel
- Check table names match exactly: `Contacts`, `Analytics`
- Check Airtable API token has write permissions

### Site not updating after push
- Vercel auto-deploys on push to main
- Check Vercel dashboard for build errors
- Try manual redeploy from Vercel

---

*Last updated: December 18, 2025*
