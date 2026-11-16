# A M Nakeeb - Personal Portfolio Website (Royal Enfield Heritage Edition)

A vintage, dark, and premium personal portfolio website for **A M Nakeeb**, final-year B.E. student in Artificial Intelligence and Machine Learning at Yenepoya Institute of Technology, Mangalore, seeking a **Software Developer** role.

Designed around a classic **Royal Enfield motorcycle aesthetic**, drawing direct color and textural inspiration from the user's personal Classic/Bullet 350 machine: matte garage black, fuel-tank cream/ivory, chrome trim, antique brass fasteners, and Royal Enfield red badge accents.

---

## 🎨 Aesthetic & Palette Tokens
- **Matte Black Base**: `#0b0b0c`, `#141416` (deep dusk garage atmosphere)
- **Cream / Ivory**: `#efe3c8` (inspired by the classic fuel tank; used for headings & crests)
- **Chrome / Silver**: `#c9ccd1` (instrument rims, borders, metallic highlights)
- **Royal Enfield Crimson**: `#b3261e` (buttons, needle accents, hover states)
- **Antique Brass**: `#b08d57` (rivets, screws, milestone caps, section medallions)

---

## 🌟 Key Features

1. **Full-Bleed Motorcycle Hero with Ken Burns Drift**:
   - Features `assets/bike.jpg` (top 8% cropped to remove cut-off text) and optimized `assets/bike.webp` fallback.
   - Multi-stop vignette gradient ensuring text contrast remains WCAG AA compliant over the image.
   - Cast-badge buttons with cream fill, chrome borders, and red hover state.
   - Mechanical odometer-styled *"Scroll Down"* indicator.

2. **Speedometer "Engine Start" Ignition Loader**:
   - Vintage Royal Enfield speedometer dial with red needle sweeping from 0 to 140 km/h.
   - Mechanical odometer reading `0 0 0 3 5 0`.
   - Smoothly fades out to reveal the page (respects `prefers-reduced-motion`).

3. **Fuel Gauge / Odometer Scroll Indicator**:
   - A real-time metallic fuel level bar tracking scroll depth along the console header.

4. **Cast Metal & Tank Badge Cards**:
   - Rounded corners with authentic 4-corner brass/chrome rivets (`.rivet`).
   - Dynamic metallic chrome-shine sweep on hover.

5. **Speedo / Ammeter Dial Skills**:
   - Dial-inspired circular chips with chrome bezels and brass pips (no fake percentages).

6. **Highway Milestone Timeline (Education)**:
   - Highway milestone marker nodes with brass/cream caps and stone bodies tracing academic progression.

7. **Stamped VIN Specification Plates (Certifications)**:
   - Engraved serial plate styling with credential verification badges.

8. **Workshop Comm Contact Dashboard**:
   - Formspree endpoint placeholder with instant `mailto:` direct client fallback.

9. **Footer "Built in Mangalore"**:
   - Hand-crafted minimalist vector line illustration of a classic Royal Enfield silhouette.

---

## 📁 Project Structure

```text
portfolio/
├── index.html            # Semantic HTML5 single-page structure with SEO & OG tags
├── css/
│   └── style.css         # Royal Enfield Heritage design system (colors, textures, rivets, 2-card grid)
├── js/
│   └── main.js           # Vanilla JS (Speedometer loader, fuel gauge, 3D canvas, typewriter, scrollspy)
├── assets/
│   ├── bike.jpg          # Cropped classic Royal Enfield motorcycle photograph
│   ├── bike.webp         # High-efficiency WebP version for fast loading
│   ├── favicon.svg       # Custom brass & chrome heritage monogram crest
│   └── Resume.pdf        # Verified downloadable resume document
└── README.md             # Documentation & deployment guide
```

---

## 🛠️ Featured Engineering Projects
1. **Multimodal Cognitive Load Detection and Adaptive Learning System for Online Education**:
   - Team major project under VTU fusing gaze, facial blendshapes, rPPG, and typing signals via a cross-modal Transformer, with a local LLM adaptively rewriting learning content in real time.
2. **AI-Driven Fish School Detection for Sustainable Fisheries**:
   - Functional ML prototype analyzing real-time sonar data telemetry for fish school detection, with a comprehensive maritime ecosystem design (CNN/YOLO, LSTM forecasting, IoT pollution monitoring) and accompanying research paper.

---

## 🌐 Deploying to GitHub Pages (Step-by-Step)

1. Create a public repository on GitHub named:  
   `AMnakeeb.github.io`
2. Push all project files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Royal Enfield Heritage Portfolio Release"
   git branch -M main
   git remote add origin https://github.com/AMnakeeb/AMnakeeb.github.io.git
   git push -u origin main
   ```
3. In GitHub:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select `main` and folder `/ (root)`.
   - Click **Save**.
4. Within 1–2 minutes, the portfolio will be live at:  
   `https://AMnakeeb.github.io/`

---

## 💻 Local Testing
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License & Credits
- Design inspired by the timeless engineering of the classic Royal Enfield motorcycle.
- All resume content, credentials, and project descriptions belong to **A M Nakeeb**.
- Open source under the [MIT License](LICENSE).
