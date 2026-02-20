import React, { useState } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hello! I'm your AI Career Guidance Assistant. What are your interests, current skills, or career goals?",
        }
    ]);
    const [input, setInput] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input;
        const newMsg = { id: Date.now(), sender: 'user', text: userText };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // In a real app, this would build a profile over time.
            // Here we send a basic profile with the user's input as interests.
            const response = await axios.post('https://carchat-sakec-bounty1.onrender.com/api/chat', {
                message: userText,
                profile: {
                    name: "User",
                    education: "Unknown",
                    interests: [userText],
                    skills: []
                }
            });

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: response.data.message
            }]);

            // If recommendations came back, we could store them in global state/context
            // to show in the Paths and Roadmaps tabs. For now, the bot message tells 
            // the user they are ready.
            if (response.data.recommendations && response.data.recommendations.length > 0) {
                localStorage.setItem('careerRecommendations', JSON.stringify(response.data.recommendations));
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: "I'm sorry, I'm having trouble connecting to my server right now. Let's try again later."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ height: 'calc(100dvh - var(--header-height) - 64px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
                    Career <span className="text-gradient">Exploration</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>Chat with AI to discover your perfect career fit.</p>
            </div>

            {/* Chat History */}
            <div className="glass-panel" style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                marginBottom: '24px'
            }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        display: 'flex',
                        gap: '16px',
                        flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                    }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: msg.sender === 'user' ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} color="var(--accent-purple)" />}
                        </div>

                        <div style={{
                            background: msg.sender === 'user' ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                            padding: '16px',
                            borderRadius: 'var(--border-radius-lg)',
                            borderTopLeftRadius: msg.sender === 'bot' ? 0 : 'var(--border-radius-lg)',
                            borderTopRightRadius: msg.sender === 'user' ? 0 : 'var(--border-radius-lg)',
                            maxWidth: '75%',
                            lineHeight: 1.6
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        flexDirection: 'row'
                    }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'var(--bg-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <Bot size={18} color="var(--accent-purple)" />
                        </div>

                        <div style={{
                            background: 'var(--bg-tertiary)',
                            padding: '16px',
                            borderRadius: 'var(--border-radius-lg)',
                            borderTopLeftRadius: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--text-muted)'
                        }}>
                            <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                            Thinking...
                            <style>{`
                              @keyframes spin { 100% { transform: rotate(360deg); } }
                            `}</style>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="E.g., I like solving logic puzzles and designing websites..."
                    style={{
                        width: '100%',
                        padding: '20px 60px 20px 24px',
                        borderRadius: 'var(--border-radius-full)',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-primary)',
                        fontSize: '16px',
                        boxShadow: 'var(--shadow-subtle)',
                        outline: 'none',
                        fontFamily: 'inherit'
                    }}
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    style={{
                        position: 'absolute',
                        right: '8px',
                        top: '8px',
                        bottom: '8px',
                        width: '44px',
                        borderRadius: '50%',
                        background: input.trim() && !isLoading ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
                        color: input.trim() && !isLoading ? 'white' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s'
                    }}
                >
                    {isLoading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={18} style={{ marginLeft: '2px' }} />}
                </button>
            </form>
        </div>
    );
};

export default Chat;
