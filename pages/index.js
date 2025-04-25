// pages/index.js
import { useState, useEffect, useRef } from 'react';

export default function NadyaChat() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'Nadya is here to tease you... Ask her anything 😘' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Oops... Nadya got distracted 😅' }]);
    }

    setLoading(false);
  };

  return (
    <div style={{ background: '#0d0d0d', color: '#fff', height: '100vh', padding: 20, fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 10 }}>💬 Nadya's Private Chat</h2>
      <div style={{ maxHeight: '70vh', overflowY: 'auto', padding: 10, border: '1px solid #333', borderRadius: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{m.role === 'user' ? 'You' : m.role === 'assistant' ? 'Nadya' : ''}:</b> <span>{m.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <input
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 5,
            border: '1px solid #555',
            background: '#1a1a1a',
            color: '#fff',
          }}
          type="text"
          placeholder="Type something naughty..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            background: '#e60073',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          {loading ? '...wait' : 'Send'}
        </button>
      </div>
    </div>
  );
}
