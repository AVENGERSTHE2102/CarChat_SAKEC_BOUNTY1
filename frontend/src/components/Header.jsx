import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="glass-panel" style={{
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'var(--gradient-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '20px',
          marginRight: '12px'
        }}>
          AI
        </div>
        <h1 style={{ fontSize: '20px', margin: 0 }}>Career Assistant</h1>
      </div>
      <div>
        <button style={{
          padding: '8px 16px',
          borderRadius: 'var(--border-radius-full)',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          color: 'var(--text-primary)',
          cursor: 'pointer'
        }}>
          New Chat
        </button>
      </div>
    </header>
  );
};

export default Header;
