import React, { useState } from 'react';
import { Briefcase, TrendingUp, Code, Palette } from 'lucide-react';

const Paths = () => {
    const [selectedPath, setSelectedPath] = useState(null);
    const mockPaths = [
        {
            title: "Full Stack Developer",
            match: "95%",
            salary: "$90k - $150k",
            icon: <Code size={24} color="var(--accent-blue)" />,
            description: "Build both frontend user interfaces and backend server logic for web applications. High demand role.",
            skills: ["React", "Node.js", "Databases", "API Design"]
        },
        {
            title: "UX/UI Designer",
            match: "88%",
            salary: "$75k - $130k",
            icon: <Palette size={24} color="var(--accent-pink)" />,
            description: "Create intuitive, beautiful digital experiences with a focus on user psychology and visual design.",
            skills: ["Figma", "Wireframing", "User Research", "Prototyping"]
        },
        {
            title: "Data Scientist",
            match: "82%",
            salary: "$100k - $160k",
            icon: <TrendingUp size={24} color="var(--accent-purple)" />,
            description: "Analyze complex datasets to extract actionable insights and build predictive machine learning models.",
            skills: ["Python", "Machine Learning", "SQL", "Statistics"]
        }
    ];

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
                    Recommended <span className="text-gradient">Career Paths</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>Based on your interests and skills analysis, here are your best matches.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {mockPaths.map((path, idx) => (
                    <div key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'var(--glass-bg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid var(--glass-border)'
                            }}>
                                {path.icon}
                            </div>
                            <div style={{
                                background: 'var(--glass-bg)',
                                padding: '4px 12px',
                                borderRadius: 'var(--border-radius-full)',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'var(--accent-blue)',
                                border: '1px solid rgba(59, 130, 246, 0.2)'
                            }}>
                                {path.match} Match
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>{path.title}</h3>
                            <div style={{ color: 'var(--text-muted)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Briefcase size={14} /> {path.salary}
                            </div>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.5, flex: 1 }}>
                            {path.description}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
                            {path.skills.map((skill, sIdx) => (
                                <span key={sIdx} style={{
                                    fontSize: '12px',
                                    padding: '4px 10px',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: '6px',
                                    color: 'var(--text-primary)'
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={() => setSelectedPath(idx)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: '8px',
                                borderRadius: 'var(--border-radius-md)',
                                background: selectedPath === idx ? 'var(--gradient-primary)' : 'var(--glass-bg)',
                                border: selectedPath === idx ? 'none' : '1px solid var(--glass-border)',
                                color: selectedPath === idx ? 'white' : 'var(--text-primary)',
                                fontWeight: 500,
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                        >
                            {selectedPath === idx ? 'Roadmap Selected' : 'Select Roadmap'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Paths;
