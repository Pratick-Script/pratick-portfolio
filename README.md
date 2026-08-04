# Pratick Majhi - Premium Personal Portfolio

A modern, highly interactive, and premium-quality developer portfolio website built using **HTML5**, **CSS3 (Vanilla)**, and **Vanilla JavaScript**. This template features a sleek dark mode backdrop, frosted glassmorphism elements, custom timelines, brand-colored skill badges, and a custom hacker-themed code symbol cursor trail.

---

## 🚀 Live Demo & Repositories

- **Live URL**: [https://react-photo-gallery-six.vercel.app/](https://react-photo-gallery-six.vercel.app/)
- **Projects Highlighted**:
  - **Cartyra Landing Page**: [GitHub Repository](https://github.com/Pratick-Script/Cartyra-E-commerce-Website) | [Live Demo Link](https://cartyra-e-commerce-website-ivqk.vercel.app/)
  - **React Photo Gallery**: [GitHub Repository](https://github.com/Pratick-Script/react-photo-gallery) | [Live Demo Link](https://react-photo-gallery-six.vercel.app/)

---

## ✨ Features & Visual Interactions

1. **Cyber Code-Symbol Cursor Trail**: An interactive custom HTML5 Canvas background that emits floating code symbols (`{`, `}`, `<>`, `0`, `1`, `git`, `npm`, `fn`, etc.) behind the cursor on mouse movement. The symbols rotate slightly, float up slowly, and fade out gently to ensure readability.
2. **Dynamic Spanning Grid**: A customized 4-column desktop layout that dynamically groups 10 core languages/skills into a 3-column-wide card and tools into a 1-column-wide card, adapting seamlessly down to 2 columns on tablets and 1 column on mobile screens.
3. **Animated Skills Badges**: Eliminates boring skill trackers/progress bars in favor of modern glassmorphic tags featuring official brand logos and colors.
4. **Organic Morphing Profile blob**: A floating, morphing photo frame in the Hero section with a glowing gradient border, properly masked to keep your photo cropped inside the blob contours.
5. **Direct AJAX Contact Form (FormSubmit.co)**: Upgraded contact form submission that posts `FormData` to FormSubmit in the background via fetch. Retains page scroll position and provides a submit button loading spinner and a success toast.
6. **Active Navigation Highlighter**: A scroll spy Intersection Observer that tracks sections and highlights active navigation links with dynamic line slides under them.

---

## 🎨 Color Palette & Design System

- **Primary Glow**: Blue (`#2563EB`)
- **Secondary Accent**: Purple (`#7C3AED`)
- **Accent Highlight**: Cyan (`#06B6D4`)
- **Dark Theme Background**: Navy Slate (`#0F172A`)
- **Frosted Glass Cards**: Transparent Slate (`rgba(30, 41, 59, 0.45)`)
- **Text Primary**: White (`#FFFFFF`)
- **Text Secondary**: Soft Gray (`#94A3B8`)
- **Typography**: Poppins (Headings) & Inter (Body text) imported via Google Fonts.

---

## 📁 Directory Structure

```text
/portfolio
│── index.html          # Semantic HTML5 layout and sections structure
│── style.css           # Grid layouts, glassmorphism tokens, animations, media queries
│── script.js          # Core JS loops, canvas animations, and FormSubmit handler
│── README.md           # Project documentation and configuration instructions
└── /assets             # High-quality preview images, portrait, and PDF resume
      ├── profile.jpeg  # Professional portrait photo
      ├── cartyra.png   # E-commerce website preview mockup
      ├── react-photo-gallery.png # Gallery application preview mockup
      └── Pratick_Resume.pdf      # Downloadable PDF Resume
```

---

## 📥 Contact Form Activation (One-time Setup)

This portfolio uses the free direct email submitter **FormSubmit.co**.
1. When you first deploy the site, go to the contact form, fill in a test message, and hit **Send Message**.
2. FormSubmit will immediately email a one-time activation link to your email: **pratickmajhi02@gmail.com**.
3. Open your inbox, click the **Activate** link, and your form is fully enabled! All future submissions will go directly to your inbox.

---

## 💻 Local Preview & Hosting

### Local Host
Open terminal inside the `/portfolio` folder:
- **Python**: `python -m http.server 8000` (Go to `http://localhost:8000`)
- **Node.js**: `npx serve` (Go to `http://localhost:3000` / `5000`)

### Production Hosting
This static site is optimized to be deployed completely free in 1-click on:
- **Vercel**: Import your GitHub repository or use `vercel deploy` in the Vercel CLI.
- **GitHub Pages**: Go to repository settings -> Pages, and select your root directory or main branch.
- **Netlify**: Drag and drop the `/portfolio` folder onto Netlify Drop.
