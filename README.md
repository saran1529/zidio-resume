# Zidio Resume Editor

**A React-based resume editor & PDF exporter** — part of the Resume System trial task.  
This project implements a live resume editor with preview and PDF export (desktop + mobile friendly).

## Demo
- Live demo: [https://zidio-resume.vercel.app](https://zidio-resume.vercel.app)

## Screenshots

**Desktop View:**  
![Desktop View](src/assets/desktop-view.png)

**Mobile View:**  
![Mobile View](src/assets/mobile-view.png)

**PDF Preview:**  
![PDF Preview](src/assets/pdf-Preview.png)

## Features
- Live resume preview (two-panel editor + preview)
- Add / remove skills, experience, education (auto-focus & keyboard-friendly)
- PDF export using `html2canvas` + `jsPDF`
- Mobile-specific PDF fixes for full-page capture and correct icon alignment
- Clean, minimal Tailwind UI

## Tech Stack
- React
- Tailwind CSS
- jsPDF & html2canvas
- React Icons
- Vite (or Create React App if preferred)

## How to run locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
