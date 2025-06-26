import React, { useState } from 'react';
import axios from 'axios';
import './ShortenerForm.css'; // We'll style it in a separate CSS file

function ShortenerForm() {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setResult(null);

    if (!url.trim()) {
      setError('Please enter a valid URL.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/shorturls', {
        url,
        validity,
        shortcode: shortcode || undefined
      });
      setResult(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>URL Shortener</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          type="number"
          placeholder="Validity in minutes"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Custom shortcode (optional)"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />

        <button onClick={handleSubmit}>Shorten</button>

        {result && (
          <div className="success">
            <p>
              Short Link: <a href={result.shortLink} target="_blank" rel="noreferrer">{result.shortLink}</a>
            </p>
            <p>Expires At: {new Date(result.expiry).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShortenerForm;
