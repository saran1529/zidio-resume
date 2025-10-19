// src/components/ResumePreview.jsx
import React, { forwardRef, useRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const ResumePreview = forwardRef(({ resume }, ref) => {
    const resumeRef = useRef();

    useImperativeHandle(ref, () => ({
        downloadPDF: async () => {
            const element = resumeRef.current;
            if (!element || Object.keys(resume).length === 0) {
                alert("Please fill in your resume before downloading.");
                return;
            }

            // Capture DOM as image
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
            });

            // Convert to image data
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgProps = { width: canvas.width, height: canvas.height };
            const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Add the image to PDF
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);

            // Convert screen pixels to PDF mm coordinates
            const rect = element.getBoundingClientRect();
            const pxToMm = pdfWidth / rect.width;

            // Add clickable links manually
            const links = element.querySelectorAll("a[href]");
            links.forEach(link => {
                const href = link.getAttribute("href");
                if (!href) return;

                const linkRect = link.getBoundingClientRect();

                // Calculate position in PDF
                const x = (linkRect.left - rect.left) * pxToMm;
                const y = (linkRect.top - rect.top) * pxToMm;
                const w = linkRect.width * pxToMm;
                const h = linkRect.height * pxToMm;

                // Adjust Y-position slightly to align clickable area with rendered text
                const offsetY = 7;
                pdf.link(x, y + offsetY, w, h, { url: href });
            });

            // Save PDF
            pdf.save("My_Resume.pdf");
        },
    }));


    // guard for missing parts
    const {
        name = "",
        title = "",
        email = "",
        phone = "",
        summary = "",
        skills = [],
        experience = [],
        education = [],
        linkedin = "",
        github = "",
    } = resume || {};

    return (
        <div
            ref={resumeRef}
            className="bg-white text-gray-800 w-full max-w-[210mm] mx-auto p-6 font-sans"
        >
            {/* Header: name/title + links */}
            <header className="flex justify-between items-start border-b border-gray-300 pb-3 mb-4 relative">
                <div className="flex-1 pr-6 min-w-0">
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">{name}</h1>
                    <p className="text-lg text-gray-600">{title}</p>

                    {/* email + phone */}
                    <div className="mt-2 text-xs text-gray-500">
                        <div className="break-words">{email}</div>
                        <div className="break-words">{phone}</div>
                    </div>
                </div>

                {/* LinkedIn & GitHub */}
                <div className="flex flex-col items-end absolute right-0 bottom-1 space-y-1">
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link linkedin-fix"
                        >
                            <FaLinkedin className="resume-icon" />
                            <span className="link-text">{linkedin}</span>
                        </a>
                    )}
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link github github-fix"
                        >
                            <FaGithub className="resume-icon" />
                            <span className="link-text">{github}</span>
                        </a>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-5">
                    <h2 className="text-l font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2">
                        Professional Summary
                    </h2>
                    <p className="text-xs ml-5 text-gray-700 leading-relaxed">{summary}</p>
                </section>
            )}

            {/* Skills (2 columns) */}
            <section className="mb-">
                <h2 className="text-l font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
                    Skills
                </h2>
                <ul className="grid grid-cols-2 ml-8 gap-y-1 gap-x-6 text-xs text-gray-700">
                    {skills.length ? (
                        skills.map((s, i) => (
                            <li key={i} className="relative pl-3 mb-1 before:content-['•'] before:absolute before:left-0 before:text-gray-700 before:text-sm before:top-0">
                                {s}
                            </li>
                        ))
                    ) : (
                        <li className="text-sm text-gray-500">No skills provided</li>
                    )}
                </ul>
            </section>

            {/* Experience */}
            <section className="mt-4">
                <h2 className="text-l font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
                    Experience
                </h2>

                <div className="space-y-4">
                    {experience.length ? (
                        experience.map((exp, idx) => (
                            <div key={idx} className="relative pb-0">
                                {/* Top row: duration + role + company + (certificate button) */}
                                <div className="flex justify-between items-center gap-2">
                                    {/* Left side: duration + role + company */}
                                    <p className="text-sm text-gray-800 font-semibold ml-5 flex flex-wrap items-baseline gap-1">
                                        <span className="text-xs text-gray-600">{exp.duration}</span>
                                        <span>•</span>
                                        <span>{exp.role || exp.position}</span>
                                        <span>—</span>
                                        <span>{exp.company}</span>
                                    </p>

                                    {/* Right side: View Certificate */}
                                    {exp.certificate && (
                                        <a
                                            href={exp.certificate}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-600 hover:underline mr-4"
                                        >
                                            View Certificate
                                        </a>
                                    )}
                                </div>

                                {/* Details below */}
                                {exp.details && (
                                    <p className="text-xs ml-5 text-gray-700 leading-relaxed mt-1">
                                        {exp.details}
                                    </p>
                                )}

                                {/* Divider */}
                                <div className="border-b border-gray-100 mt-3" />
                            </div>
                        ))
                    ) : (
                        <p className="text-s text-gray-500 ml-7">No experience added</p>
                    )}
                </div>
            </section>



            {/* Education */}
            <section className="mb-4">
                <h2 className="text-l font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-3">
                    Education
                </h2>

                <div className="space-y-3">
                    {education.length ? (
                        education.map((edu, i) => (
                            <div key={i} className="text-sm text-gray-700">
                                {/* Degree and year */}
                                <div className="ml-5 flex gap-5 items-center">
                                    <p className="font-semibold text-gray-800">{edu.degree}</p>
                                    <p className="text-xs text-gray-500">{edu.year}</p>
                                </div>
                                <p className="text-gray-600 ml-8 text-xs">{edu.institution || edu.college}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-s text-gray-500 ml-7">No education added</p>
                    )}
                </div>

            </section>
        </div>
    );
});

export default ResumePreview;
