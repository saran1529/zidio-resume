import React from "react";

function ListInput({ label, value = [], onChange, placeholder = "" }) {
    const handleChange = (idx, v) => {
        const copy = [...value];
        copy[idx] = v;
        onChange(copy);
    };
    const add = () => onChange([...value, ""]);
    const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{label}</label>
            {value.map((val, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                    <input
                        className="flex-1 border rounded px-2 py-1"
                        value={val}
                        placeholder={placeholder}
                        onChange={(e) => handleChange(idx, e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="px-2 bg-red-500 text-white rounded"
                        title="Remove"
                    >
                        ×
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={add}
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
            >
                + Add
            </button>
        </div>
    );
}

export default function ResumeEditor({ resume, setResume }) {
    const updateField = (path, value) => {
        setResume((prev) => {
            const copy = JSON.parse(JSON.stringify(prev));
            const keys = path.split(".");
            let cur = copy;
            for (let i = 0; i < keys.length - 1; i++) {
                cur = cur[keys[i]];
            }
            cur[keys[keys.length - 1]] = value;
            return copy;
        });
    };

    return (
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    value={resume.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full border rounded px-2 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                    value={resume.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="w-full border rounded px-2 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Summary</label>
                <textarea
                    value={resume.summary}
                    onChange={(e) => updateField("summary", e.target.value)}
                    rows="3"
                    className="w-full border rounded px-2 py-2"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        value={resume.contact.email}
                        onChange={(e) => updateField("contact.email", e.target.value)}
                        className="w-full border rounded px-2 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                        value={resume.contact.phone}
                        onChange={(e) => updateField("contact.phone", e.target.value)}
                        className="w-full border rounded px-2 py-2"
                    />
                </div>
            </div>

            <ListInput
                label="Skills"
                value={resume.skills}
                onChange={(v) => updateField("skills", v)}
                placeholder="e.g. React"
            />

            <div>
                <label className="block text-sm font-medium mb-2">Projects</label>
                {resume.projects.map((p, idx) => (
                    <div key={idx} className="border rounded p-2 mb-2">
                        <input
                            className="w-full border rounded px-2 py-1 mb-1"
                            value={p.name}
                            onChange={(e) => {
                                const copy = [...resume.projects];
                                copy[idx].name = e.target.value;
                                setResume({ ...resume, projects: copy });
                            }}
                            placeholder="Project name"
                        />
                        <input
                            className="w-full border rounded px-2 py-1 mb-1"
                            value={p.link}
                            onChange={(e) => {
                                const copy = [...resume.projects];
                                copy[idx].link = e.target.value;
                                setResume({ ...resume, projects: copy });
                            }}
                            placeholder="Link (GitHub/Live)"
                        />
                        <textarea
                            className="w-full border rounded px-2 py-1"
                            value={p.desc}
                            onChange={(e) => {
                                const copy = [...resume.projects];
                                copy[idx].desc = e.target.value;
                                setResume({ ...resume, projects: copy });
                            }}
                            rows="2"
                        />
                    </div>
                ))}
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            setResume({
                                ...resume,
                                projects: [...resume.projects, { name: "", desc: "", link: "" }]
                            })
                        }
                        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
                    >
                        + Add project
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setResume({
                                ...resume,
                                projects: resume.projects.length > 1 ? resume.projects.slice(0, -1) : resume.projects
                            })
                        }
                        className="mt-2 px-3 py-1 bg-gray-300 rounded text-sm"
                    >
                        - Remove last
                    </button>
                </div>
            </div>
        </form>
    );
}
