import React, { useRef } from "react";

export default function ResumeEditor({ resume, setResume }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResume({ ...resume, [name]: value });
    };

    const skillRefs = useRef([]);
    const experienceRefs = useRef([]);
    const educationRefs = useRef([]);

    const handleAdd = (field) => {
        if (field === "skills") {
            const newSkills = [...(resume.skills || ""), ""];
            setResume({ ...resume, skills: newSkills });
            setTimeout(() => skillRefs.current[newSkills.length - 1]?.focus(), 0);
        } else if (field === "experience") {
            const newExp = [...(resume.experience || []), { role: "", company: "", duration: "", details: "", certificate: "" }];
            setResume({ ...resume, experience: newExp });
            setTimeout(() => experienceRefs.current[newExp.length - 1][0]?.focus(), 0);
        } else if (field === "education") {
            const newEdu = [...(resume.education || []), { degree: "", college: "", year: "" }];
            setResume({ ...resume, education: newEdu });
            setTimeout(() => educationRefs.current[newEdu.length - 1][0]?.focus(), 0);
        }
    };

    const handleRemove = (field, index) => {
        const newField = [...(resume[field] || [])];
        newField.splice(index, 1);
        setResume({ ...resume, [field]: newField });
    };

    const handleArrayChange = (field, index, key, value) => {
        const newField = [...(resume[field] || [])];
        if (field === "skills") newField[index] = value;
        else newField[index][key] = value;
        setResume({ ...resume, [field]: newField });
    };

    const handleKeyDown = (e, field, i, j = 0) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (field === "skills" && skillRefs.current[i + 1]) skillRefs.current[i + 1].focus();
            if (field === "experience" && experienceRefs.current[i][j + 1]) experienceRefs.current[i][j + 1].focus();
            if (field === "education" && educationRefs.current[i][j + 1]) educationRefs.current[i][j + 1].focus();
        }
    };

    return (
        <form className="space-y-6 p-4 max-w-4xl mx-auto">
            {/* Basic Info */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" value={resume?.name || ""} onChange={handleChange} placeholder="Full Name" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                    <input type="text" name="title" value={resume?.title || ""} onChange={handleChange} placeholder="Job Title" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                    <input type="email" name="email" value={resume?.email || ""} onChange={handleChange} placeholder="Email" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                    <input type="text" name="phone" value={resume?.phone || ""} onChange={handleChange} placeholder="Phone" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                </div>
            </div>

            {/* Links */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="url" name="linkedin" value={resume?.linkedin || ""} onChange={handleChange} placeholder="LinkedIn URL" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                    <input type="url" name="github" value={resume?.github || ""} onChange={handleChange} placeholder="GitHub URL" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">Professional Summary</h2>
                <textarea name="summary" value={resume?.summary || ""} onChange={handleChange} rows="4" placeholder="Write a short professional summary..." className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600 resize-none" />
            </div>

            {/* Skills */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
                <div className="space-y-2">
                    {(resume?.skills || []).map((skill, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <input type="text" ref={(el) => (skillRefs.current[i] = el)} value={skill} onChange={(e) => handleArrayChange("skills", i, null, e.target.value)} onKeyDown={(e) => handleKeyDown(e, "skills", i)} placeholder="Skill" className="flex-1 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                            <button type="button" onClick={() => handleRemove("skills", i)} className="text-red-500 hover:underline text-sm">Remove</button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => handleAdd("skills")} className="text-green-600 hover:underline text-sm mt-1">+ Add Skill</button>
            </div>

            {/* Experience */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
                {(resume?.experience || []).map((job, i) => (
                    <div key={i} className="space-y-2 border-b border-gray-200 pb-2">
                        <input type="text" ref={(el) => (experienceRefs.current[i] = experienceRefs.current[i] || [])[0] = el} value={job.role} onChange={(e) => handleArrayChange("experience", i, "role", e.target.value)} onKeyDown={(e) => handleKeyDown(e, "experience", i, 0)} placeholder="Role / Position" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                        <input type="text" ref={(el) => (experienceRefs.current[i][1] = el)} value={job.company} onChange={(e) => handleArrayChange("experience", i, "company", e.target.value)} onKeyDown={(e) => handleKeyDown(e, "experience", i, 1)} placeholder="Company / Organization" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                        <input type="text" ref={(el) => (experienceRefs.current[i][2] = el)} value={job.duration} onChange={(e) => handleArrayChange("experience", i, "duration", e.target.value)} onKeyDown={(e) => handleKeyDown(e, "experience", i, 2)} placeholder="Duration" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                        <textarea ref={(el) => (experienceRefs.current[i][3] = el)} value={job.details} onChange={(e) => handleArrayChange("experience", i, "details", e.target.value)} onKeyDown={(e) => handleKeyDown(e, "experience", i, 3)} rows="2" placeholder="Details" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600 resize-none" />
                        <input ref={(el) => (experienceRefs.current[i][4] = el)} type="url" value={job.certificate || ""} onChange={(e) => handleArrayChange("experience", i, "certificate", e.target.value)} placeholder="Certificate Link" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                        <button type="button" onClick={() => handleRemove("experience", i)} className="text-red-500 hover:underline text-sm">Remove Experience</button>
                    </div>
                ))}
                <button type="button" onClick={() => handleAdd("experience")} className="text-green-600 hover:underline text-sm mt-1">+ Add Experience</button>
            </div>

            {/* Education */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">Education</h2>
                {(resume?.education || []).map((edu, i) => (
                    <div key={i} className="space-y-2 border-b border-gray-200 pb-2">
                        <input ref={(el) => (educationRefs.current[i] = educationRefs.current[i] || [])[0] = el} type="text" value={edu.degree} onChange={(e) => handleArrayChange("education", i, "degree", e.target.value)} onKeyDown={(e) => handleKeyDown(e, "education", i, 0)} placeholder="Degree / Standard" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                        <input ref={(el) => (educationRefs.current[i][1] = el)} type="text" value={edu.college} onChange={(e) => handleArrayChange("education", i, "college", e.target.value)} onKeyDown={(e) => handleKeyDown(e, "education", i, 1)} placeholder="College / School" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                        <input ref={(el) => (educationRefs.current[i][2] = el)} type="text" value={edu.year} onChange={(e) => handleArrayChange("education", i, "year", e.target.value)} onKeyDown={(e) => handleKeyDown(e, "education", i, 2)} placeholder="Year of Passed Out" className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600" />
                        <button type="button" onClick={() => handleRemove("education", i)} className="text-red-500 hover:underline text-sm">Remove Education</button>
                    </div>
                ))}
                <button type="button" onClick={() => handleAdd("education")} className="text-green-600 hover:underline text-sm mt-1">+ Add Education</button>
            </div>
        </form>
    );
}
