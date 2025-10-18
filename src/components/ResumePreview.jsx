import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumePreview({ resume }) {
    const ref = useRef();

    const downloadPDF = async () => {
        const node = ref.current;
        // scale to improve quality
        const canvas = await html2canvas(node, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${(resume.name || "resume").replace(/\s+/g, "_")}.pdf`);
    };

    return (
        <div>
            <div ref={ref} className="p-6 bg-white border rounded text-gray-800" style={{ width: "100%", maxWidth: 680 }}>
                <div className="flex items-start justify-between border-b pb-3 mb-3">
                    <div>
                        <h1 className="text-2xl font-bold">{resume.name}</h1>
                        <div className="text-sm text-gray-600">{resume.title}</div>
                    </div>
                    <div className="text-right text-sm">
                        <div>{resume.contact.email}</div>
                        <div>{resume.contact.phone}</div>
                        <div>{resume.contact.location}</div>
                    </div>
                </div>

                <section className="mb-3">
                    <h3 className="font-semibold text-sm">Summary</h3>
                    <p className="text-sm">{resume.summary}</p>
                </section>

                <section className="mb-3">
                    <h3 className="font-semibold text-sm">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {resume.skills.map((s, i) => (
                            <span key={i} className="text-xs px-2 py-1 border rounded">
                                {s}
                            </span>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="font-semibold text-sm mb-2">Projects</h3>
                    <div className="space-y-2">
                        {resume.projects.map((p, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-baseline">
                                    <strong>{p.name || "Project"}</strong>
                                    {p.link && (
                                        <a href={p.link} target="_blank" rel="noreferrer" className="text-xs text-blue-600">
                                            {p.link}
                                        </a>
                                    )}
                                </div>
                                <div className="text-sm text-gray-700">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="mt-4 flex gap-2">
                <button onClick={downloadPDF} className="px-4 py-2 bg-green-600 text-white rounded">
                    Download PDF
                </button>
            </div>
        </div>
    );
}
