import React, { useState } from 'react';
import { Terminal, Database, Server, Cloud, CheckCircle2, Circle } from 'lucide-react';

const Roadmaps = () => {
    const [roadmapSteps, setRoadmapSteps] = useState([
        {
            title: "Frontend Fundamentals",
            status: "completed",
            icon: <Terminal size={20} />,
            items: ["HTML5 & Semantic Web", "CSS Flexbox & Grid", "JavaScript ES6+", "DOM Manipulation"]
        },
        {
            title: "React & UI Frameworks",
            status: "in-progress",
            icon: <Database size={20} />,
            items: ["React Hooks & Components", "State Management (Redux/Zustand)", "Routing & Navigation", "CSS Frameworks (Tailwind)"]
        },
        {
            title: "Backend Integration",
            status: "pending",
            icon: <Server size={20} />,
            items: ["RESTful APIs", "Node.js Basics", "Database Fundamentals (SQL/NoSQL)", "Authentication via JWT"]
        },
        {
            title: "Deployment & DevOps",
            status: "pending",
            icon: <Cloud size={20} />,
            items: ["Git & GitHub workflows", "CI/CD Basics", "Vercel / Netlify Deployment", "Docker containerization basics"]
        }
    ]);

    const handleStepAction = (idx) => {
        setRoadmapSteps(prev => prev.map((step, i) => {
            if (i === idx) {
                if (step.status === 'in-progress') return { ...step, status: 'completed' };
                if (step.status === 'pending') return { ...step, status: 'in-progress' };
            }
            // Auto unlock the next pending step if the current one is completed
            if (i === idx + 1 && prev[idx].status === 'in-progress') {
                return { ...step, status: 'in-progress' };
            }
            return step;
        }));
    };

    return (
        <div>
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
                    Your <span className="text-gradient">Learning Roadmap</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>Track your progress towards becoming a Full Stack Developer.</p>
            </div>

            <div style={{ position: 'relative', paddingLeft: '24px' }}>
                {/* Vertical timeline line */}
                <div style={{
                    position: 'absolute',
                    left: '33px',
                    top: '24px',
                    bottom: '24px',
                    width: '2px',
                    background: 'var(--glass-border)',
                    zIndex: 0
                }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {roadmapSteps.map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1 }}>

                            {/* Status Indicator bubble */}
                            <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: step.status === 'completed' ? 'var(--accent-blue)' :
                                    step.status === 'in-progress' ? 'var(--accent-purple)' : 'var(--bg-tertiary)',
                                border: `4px solid var(--bg-primary)`,
                                boxShadow: step.status !== 'pending' ? 'var(--shadow-glow)' : 'none',
                                marginTop: '16px',
                                flexShrink: 0
                            }}></div>

                            <div className="glass-panel" style={{
                                flex: 1,
                                padding: '24px',
                                borderLeft: step.status === 'in-progress' ? '3px solid var(--accent-purple)' : '1px solid var(--glass-border)',
                                opacity: step.status === 'pending' ? 0.6 : 1
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{
                                        color: step.status === 'completed' ? 'var(--accent-blue)' :
                                            step.status === 'in-progress' ? 'var(--accent-purple)' : 'var(--text-muted)'
                                    }}>
                                        {step.icon}
                                    </div>
                                    <h3 style={{ fontSize: '18px', margin: 0 }}>{step.title}</h3>
                                    <div style={{
                                        marginLeft: 'auto',
                                        fontSize: '12px',
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        color: step.status === 'completed' ? 'var(--accent-blue)' :
                                            step.status === 'in-progress' ? 'var(--accent-purple)' : 'var(--text-muted)'
                                    }}>
                                        {step.status.replace('-', ' ')}
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                    {step.items.map((item, iIdx) => (
                                        <div key={iIdx} style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '8px',
                                            color: 'var(--text-secondary)',
                                            fontSize: '14px'
                                        }}>
                                            <div style={{ marginTop: '2px', color: step.status === 'completed' ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
                                                {step.status === 'completed' ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                                            </div>
                                            <span style={{ textDecoration: step.status === 'completed' ? 'line-through' : 'none' }}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {step.status !== 'completed' && (
                                    <button
                                        onClick={() => handleStepAction(idx)}
                                        style={{
                                            marginTop: '20px',
                                            padding: '8px 16px',
                                            background: step.status === 'pending' ? 'var(--bg-tertiary)' : 'var(--gradient-primary)',
                                            color: step.status === 'pending' ? 'var(--text-muted)' : 'white',
                                            borderRadius: 'var(--border-radius-md)',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            cursor: step.status === 'pending' ? 'not-allowed' : 'pointer',
                                            opacity: step.status === 'pending' ? 0.7 : 1,
                                            border: 'none'
                                        }}
                                        disabled={step.status === 'pending'}
                                    >
                                        {step.status === 'in-progress' ? 'Mark Completed' : 'Locked'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Roadmaps;
