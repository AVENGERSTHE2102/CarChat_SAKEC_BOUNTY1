import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Map, GraduationCap } from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const navItems = [
        { path: '/', label: 'Chat Assistant', icon: <MessageSquare size={20} /> },
        { path: '/paths', label: 'Career Paths', icon: <Map size={20} /> },
        { path: '/roadmaps', label: 'Learning Roadmaps', icon: <GraduationCap size={20} /> },
    ];

    return (
        <aside className={`glass-panel sidebar-container ${isOpen ? 'open' : ''}`} style={{
            width: 'var(--sidebar-width)',
            height: 'calc(100dvh - var(--header-height))',
            position: 'fixed',
            left: 0,
            top: 'var(--header-height)',
            padding: '24px 16px',
            borderLeft: 'none',
            borderBottom: 'none',
            borderTop: 'none',
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 5,
        }}>
            <div style={{ marginBottom: '16px', paddingLeft: '12px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                Menu
            </div>

            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: 'var(--border-radius-md)',
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                        background: isActive ? 'var(--glass-bg)' : 'transparent',
                        border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        fontWeight: isActive ? 500 : 400,
                    })}
                >
                    <span style={{ color: 'var(--accent-blue)' }}>{item.icon}</span>
                    {item.label}
                </NavLink>
            ))}
        </aside>
    );
};

export default Sidebar;
