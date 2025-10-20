# Approach & Tools

## What I Built
A responsive **Resume Editor** built using React that allows users to create, edit, and preview resumes in real time.  
It includes the ability to:
- Add or remove sections like skills, education, and experience dynamically.
- Automatically focus newly added fields for a smoother editing experience.
- Live preview updates instantly as the user types.
- Export the entire resume as a **PDF** with a single click.

The layout is fully responsive — it works seamlessly on both desktop and mobile browsers.

---

## Key Technical Decisions

### 1. **Client-Side PDF Generation**
Used `html2canvas` and `jsPDF` for PDF export directly in the browser, eliminating the need for any backend processing.  
This ensures:
- Fast performance.
- Full privacy (no user data leaves the browser).
- Easy deployment as a static site.

### 2. **Mobile PDF Fixes**
Mobile browsers caused PDF cropping and icon misalignment during export.  
To fix this:
- Temporarily locked the resume container width to **A4 size (794px)** during capture.
- Implemented **multi-page PDF support** for long resumes.
- Added **mobile-only adjustments** for icon positioning and sizing before capture.
- Restored original layout after saving the PDF.

Now, the exported PDF looks identical on both mobile and desktop devices.

### 3. **Stateless & Scalable Structure**
Resume data is maintained as a simple `resume` JSON object within React state (`useState`).  
This design allows easy future integration with:
- Backend APIs (e.g., Node.js, Spring Boot)
- Databases or authentication systems
- Dynamic user profiles

The frontend remains clean, modular, and easy to extend.

---

## Tools & Technologies

| Tool | Purpose |
|------|----------|
| **React** | Core framework for UI |
| **Tailwind CSS** | Utility-first CSS for responsive design |
| **jsPDF** | PDF generation library |
| **html2canvas** | Converts HTML content to an image for PDF |
| **React Icons** | For GitHub and LinkedIn icons |
| **Vite** | Fast build tool and dev server |

---

## How It Fits into the Ecosystem
This Resume Editor can be integrated into a broader platform (like a job portal or profile system).  
For example:
- Resume data can auto-fill from a user’s verified profile.
- Certificate links can be validated by backend services.
- The system can generate **verified dynamic resumes** instantly.

This makes it not just a standalone tool, but a foundational component for future **resume automation and verification systems**.

---

## Summary
This project demonstrates:
- Solid understanding of modern React development.
- Real-world problem-solving (mobile PDF fixes).
- Clean architecture for easy backend integration.
- Responsive and user-friendly UI.

> Built with LOVE using React, Tailwind CSS, jsPDF, and html2canvas.
