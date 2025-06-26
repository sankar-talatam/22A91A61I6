// src/App.jsx
import { useState } from 'react';

function App() {
  const [status, setStatus] = useState('');

  const sendEmail = async () => {
    const res = await fetch('http://localhost:5000/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'xxxcxd820@gmail.com',
        subject: 'Hello from React',
        text: 'This is a test email.',
      }),
    });

    const data = await res.json();
    setStatus(data.message || data.error);
  };

  return (
    <div>
      <h1>Send Email</h1>
      <button onClick={sendEmail}>Send</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
