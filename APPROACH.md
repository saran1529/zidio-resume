# Approach & Tools

## What I Built
A responsive **Resume Editor** built with React that lets users create, edit, and preview resumes in real time.  
Key features:
- Dynamically add or remove sections like skills, education, and experience.
- Auto-focus newly added fields for smoother editing.
- Live preview updates instantly as the user types.
- Export the resume as a **PDF** with a single click.

The layout is fully responsive and works seamlessly on desktop and mobile browsers.

---

## Key Technical Decisions

### 1. Client-Side PDF Generation
Used `html2canvas` and `jsPDF` to generate PDFs directly in the browser:
- Eliminates the need for a backend.
- Ensures fast performance and full user privacy.
- Enables deployment as a static site.

### 2. Mobile PDF Fixes
To fix PDF cropping and icon misalignment on mobile:
- Temporarily locked the resume container width to **A4 size (794px)** during capture.
- Added **multi-page PDF support** for long resumes.
- Implemented **mobile-only adjustments** for icon positioning and sizing.
- Restored the original layout after saving the PDF.

Result: PDFs look identical on desktop and mobile.

### 3. Stateless & Scalable Structure
Resume data is maintained as a simple JSON object in React state (`useState`).  
This allows easy future integration with:
- Backend APIs (Node.js, Spring Boot, etc.)
- Databases or authentication systems
- Dynamic user profiles

The frontend remains clean, modular, and extendable.

---

## Tools & Technologies

| Tool | Purpose |
|------|---------|
| **React** | Core framework for UI |
| **Tailwind CSS** | Responsive utility-first styling |
| **jsPDF** | PDF generation |
| **html2canvas** | Converts HTML to image for PDF |
| **React Icons** | GitHub, LinkedIn, and other icons |
| **Vite** | Fast dev server and build tool |

---

## Ecosystem Integration
This Resume Editor can be integrated into a broader platform such as a job portal or user profile system:
- Resume data can auto-fill from a user’s verified profile.
- Certificates and links can be validated by backend services.
- Enables **verified dynamic resumes** instantly.

This makes the tool not just standalone, but a foundation for future resume automation and verification.

---

## Summary
This project demonstrates:
- Strong React development skills.
- Real-world problem-solving (mobile PDF fixes).
- Clean, modular architecture for easy backend integration.
- Responsive and user-friendly UI.

> Built with ❤️ using React, Tailwind CSS, jsPDF, and html2canvas.
