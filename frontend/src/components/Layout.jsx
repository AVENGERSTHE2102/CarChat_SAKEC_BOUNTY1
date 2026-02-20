import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', position: 'relative' }}>
            <div className="animated-bg-glow" style={{ top: '20%', left: '10%' }}></div>
            <div className="animated-bg-glow" style={{ bottom: '10%', right: '5%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(10, 10, 15, 0) 70%)' }}></div>

            <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

                <main className="main-content">
                    <Outlet />
                </main>

                {/* Mobile overlay */}
                {isSidebarOpen && (
                    <div
                        className="mobile-overlay"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 'var(--header-height)',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 40
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Layout;
