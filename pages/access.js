import { useState } from 'react';

export default function AccessPage() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [token, setToken] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Verifying...');

    try {
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: input, phone: input }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to verify');

      setToken(data.token);
      localStorage.setItem('nadya_token', data.token);
      window.location.href = '/'; // Redirect to chat
    } catch (err) {
      setStatus(err.message || 'Something went wrong');
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Access Nadya 💋</h1>
      <p style={styles.sub}>Enter your email or phone number to continue</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Email or Phone"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Enter</button>
      </form>

      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0a0a0a',
    color: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: 10,
  },
  sub: {
    color: '#bbb',
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '300px',
  },
  input: {
    padding: 10,
    fontSize: '1rem',
    borderRadius: 5,
    border: '1px solid #444',
    backgroundColor: '#1a1a1a',
    color: 'white',
  },
  button: {
    padding: 10,
    fontSize: '1rem',
    backgroundColor: '#ff3377',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  status: {
    marginTop: 10,
    color: '#ff6666',
  },
};
