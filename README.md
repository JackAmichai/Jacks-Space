# Jack Amichai - Professional Portfolio

A modern, high-performance portfolio website built with the **Bento Box design system**—showcasing my work as a Product-minded Consultant & AI Builder.

![Portfolio Preview](images/preview.png)

## 🎯 Overview

This portfolio demonstrates:
- **Professional Excellence**: SAP SuccessFactors consulting, AI agent development, cloud solutions
- **Technical Sophistication**: Modern CSS Grid, semantic HTML5, optimized performance
- **Design Innovation**: Bento box layout, micro-interactions, smooth animations
- **Human Connection**: Personality modules, writing samples, authentic voice

## 🚀 Features

### Design System
- **Bento Box / Modular Grid Layout**: Dynamic, engaging visual hierarchy
- **Dark Mode First**: Professional dark theme with electric blue accents
- **Responsive Mastery**: Seamless experience from mobile (320px) to 4K displays
- **Micro-Interactions**: Smooth reveals, parallax effects, hover animations

### Performance Optimized
- **< 2s Load Time**: Optimized images, minimal dependencies
- **95+ Lighthouse Score**: Accessibility, SEO, best practices
- **CSS Grid + Flexbox**: Modern, efficient layouts
- **Vanilla JavaScript**: No frameworks, pure performance

### Content Modules
1. **Hero Section**: Dynamic introduction with professional photo overlay
2. **Signal Snapshot**: Technical skills and core competencies
3. **Featured Work**: NVIDIA Doc Navigator AI project showcase
4. **Value Propositions**: Clear explanations of what I actually do
5. **Personality Module**: Books, violin, human side
6. **Experience Timeline**: Career journey and milestones
7. **Writing Samples**: Thought leadership and insights
8. **Philosophy**: Core values and design principles
9. **Call to Action**: Contact and collaboration opportunities

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with Bento grid
├── script.js           # Interactive features and animations
├── README.md           # This file
├── images/             # Photos and project screenshots
│   ├── hero-photo.jpg
│   ├── nvidia-project.jpg
│   ├── books-violin.jpg
│   ├── deloitte-logo.svg
│   └── university-logo.svg
└── icons/              # Skill icons
    ├── sap.svg
    ├── ai.svg
    ├── aws.svg
    ├── python.svg
    ├── automation.svg
    └── design.svg
```

## 🎨 Design Specifications

### Color Palette
```css
Primary Background: #0F172A (Deep slate)
Secondary Background: #1E293B (Module background)
Text Primary: #F8F8F8 (Soft white)
Text Secondary: #94A3B8 (Muted gray)
Accent: #3B82F6 (Electric blue)
```

### Typography
- **Display Font**: Space Grotesk (Headlines)
- **Body Font**: Inter (Content)
- **Responsive Sizing**: `clamp()` for fluid typography

### Grid System
- **Desktop**: 12-column CSS Grid
- **Tablet**: 6-column responsive grid
- **Mobile**: Single column stack

## 🚀 Deployment Instructions

### GitHub Pages Setup

1. **Create GitHub Repository**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

2. **Enable GitHub Pages**
- Go to repository **Settings** → **Pages**
- Source: `main` branch
- Root directory: `/` (root)
- Click **Save**
- Your site will be live at: `https://YOUR_USERNAME.github.io`

3. **Custom Domain (Optional)**
```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

Then configure DNS:
- Add CNAME record: `www` → `YOUR_USERNAME.github.io`
- Add A records for apex domain to GitHub Pages IPs

## 📸 Image Optimization Guide

### Before Uploading Images

**Using ImageMagick** (recommended):
```bash
# Install ImageMagick
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: apt-get install imagemagick

# Optimize JPEG images
magick convert input.jpg -quality 85 -resize 2000x2000> output.jpg

# Convert to WebP for better performance
magick convert input.jpg -quality 85 output.webp
```

**Using Online Tools**:
- [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
- [Squoosh](https://squoosh.app/) - Modern image optimization
- [CloudConvert](https://cloudconvert.com/) - Batch conversion to WebP

### Image Requirements
- **Hero Photo**: 1920x1280px, < 200KB
- **Project Screenshots**: 1600x1200px, < 150KB
- **Icon Images**: 512x512px, < 50KB
- **Company Logos**: SVG format preferred

## 🎯 Customization Guide

### Update Your Information

1. **Personal Details** (`index.html`):
   - Line 7: Update page title
   - Line 8: Update meta description
   - Line 15: Update your name
   - Lines 26-30: Update hero title and subtitle

2. **Skills** (`index.html`, lines 37-62):
   - Replace skill items with your tech stack
   - Update icon paths in `icons/` folder

3. **Projects** (`index.html`, lines 65-75):
   - Replace NVIDIA project with your featured work
   - Update project images and descriptions
   - Add case study links

4. **Contact Info** (`index.html`, lines 180-190):
   - Update email address
   - Update LinkedIn, GitHub, Twitter links

5. **Colors** (`styles.css`, lines 7-17):
   - Change `--accent-primary` for different color theme
   - Options: `#3B82F6` (blue), `#F97316` (orange), `#14B8A6` (teal)

### Add New Modules

```html
<!-- Add this to bento-grid in index.html -->
<section class="module custom-module" data-module="custom">
    <h3 class="module-title">Module Title</h3>
    <p>Your content here</p>
</section>
```

```css
/* Add this to styles.css */
.custom-module {
    grid-column: 1 / 5;
    grid-row: 8 / 9;
}
```

## ✅ Pre-Launch Checklist

### Content
- [ ] Replace all placeholder text with your information
- [ ] Add real professional photo to `images/hero-photo.jpg`
- [ ] Add project screenshots to `images/`
- [ ] Update all links (LinkedIn, GitHub, email)
- [ ] Create and upload resume PDF

### Technical
- [ ] Optimize all images (< 200KB each)
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test mobile responsiveness (iPhone, Android)
- [ ] Run Lighthouse audit (aim for 95+ scores)
- [ ] Check all links work correctly
- [ ] Validate HTML (W3C validator)
- [ ] Check console for JavaScript errors

### SEO & Accessibility
- [ ] Update meta description with your value proposition
- [ ] Add alt text to all images
- [ ] Ensure keyboard navigation works (Tab through elements)
- [ ] Check color contrast (minimum 4.5:1)
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Add Open Graph tags for social sharing

## 🧪 Testing Commands

### Local Development
```bash
# Simple Python server
python -m http.server 8000

# Or use VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Visit: `http://localhost:8000`

### Performance Testing
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:8000 --view
```

### Browser Testing
- **Chrome**: F12 → Device toolbar for responsive testing
- **Firefox**: F12 → Responsive Design Mode
- **Safari**: Develop → Enter Responsive Design Mode

## 📊 Expected Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 95-100
- **Accessibility**: 100
- **Best Practices**: 95-100
- **SEO**: 100

### Load Times
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Total Page Weight**: < 1.5MB

## 🎓 Technologies Used

- **HTML5**: Semantic markup, accessibility features
- **CSS3**: CSS Grid, Flexbox, custom properties, animations
- **JavaScript (Vanilla)**: Intersection Observer, smooth scroll, parallax
- **Google Fonts**: Space Grotesk, Inter
- **GitHub Pages**: Free hosting with custom domain support

## 🔧 Troubleshooting

### Images Not Loading
- Check file paths are relative: `images/filename.jpg`
- Verify image files exist in `images/` folder
- Check filename case matches exactly (case-sensitive on Linux)

### Layout Breaks on Mobile
- Clear browser cache
- Check media queries in `styles.css`
- Verify `<meta name="viewport">` tag exists

### JavaScript Not Working
- Check browser console for errors (F12)
- Ensure `script.js` path is correct
- Verify script tag is before `</body>`

### GitHub Pages Not Updating
- Clear browser cache (Ctrl+Shift+R)
- Wait 2-3 minutes for GitHub to rebuild
- Check repository Settings → Pages for build status

## 📝 License

This project is open source and available under the MIT License. Feel free to use this template for your own portfolio—just customize it to reflect your unique story!

## 🤝 Credits

**Design & Development**: Jack Amichai  
**Design System**: Bento Box / Modular Grid  
**Typography**: Google Fonts (Space Grotesk, Inter)  
**Hosting**: GitHub Pages  

## 📬 Contact
Waiting to hear from you!
Questions about this portfolio or want to collaborate?

- **Email**: jackamichai@gmail.com
- **LinkedIn**: [linkedin.com/in/jack-amichai](https://linkedin.com/in/jack-amichai)
- **GitHub**: [github.com/jack-amichai](https://github.com/jack-amichai)

---

**Built with integrity, curiosity, and precision** ✨
