# 🔤 ZT Formom Font Integration Guide

## 📥 Step 1: Download Font

1. Visit: **https://befonts.com/zt-formom-font.html**
2. Click **"Download"** button
3. Extract the `.zip` file
4. You should have files like:
   - `ZT-Formom-Regular.ttf` (Required)
   - `ZT-Formom-Italic.ttf` (Optional)

---

## 📂 Step 2: Place Font Files

Copy the font files to:
```
/Users/romica/Library/Mobile Documents/com~apple~CloudDocs/01 Projects/GitHub/QorientaV2/assets/fonts/
```

**Expected files in assets/fonts/:**
- `ZT-Formom-Regular.ttf`
- `ZT-Formom-Italic.ttf` (if available)

---

## 🔧 Step 3: Convert to Web Formats (Optional but Recommended)

For better browser support, convert `.ttf` to `.woff` and `.woff2`:

### Option A: Online Converter
- Visit: https://cloudconvert.com/ttf-to-woff2
- Upload: `ZT-Formom-Regular.ttf`
- Download: `ZT-Formom-Regular.woff2`
- Repeat for `.woff` format

### Option B: Using Terminal (if you have fonttools)
```bash
cd "assets/fonts"
# Install fonttools (if not installed)
pip3 install fonttools brotli

# Convert TTF to WOFF2
pyftsubset "ZT-Formom-Regular.ttf" --output-file="ZT-Formom-Regular.woff2" --flavor=woff2 --layout-features='*' --no-subset-tables+=GPOS,GSUB,GDEF
```

---

## ✅ Step 4: Apply Font to Site

Once font files are in place, run:
```bash
python3 apply_formom_font.py
```

This will:
- ✅ Add `<link>` to font CSS in all HTML files
- ✅ Update Tailwind config to use 'ZT Formom' for display/headings
- ✅ Keep body text with a clean sans-serif (Inter)

---

## 🎨 Font Usage

After implementation:
- **Headings (h1, h2, h3)**: ZT Formom (elegant, decorative)
- **Body text**: Inter (clean, readable)
- **Fallback**: serif (if font fails to load)

---

## 📝 Note

ZT Formom is a **display font** - best for:
- ✅ Large headings
- ✅ Hero titles
- ✅ Section headers

❌ NOT recommended for:
- Body paragraphs (hard to read at small sizes)
- Long-form content

---

## 🚀 Ready?

After downloading and placing the font files, let me know and I'll complete the integration!
