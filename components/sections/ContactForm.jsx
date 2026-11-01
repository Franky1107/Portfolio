'use client';

import { useState } from 'react';

const LABELS = { idle: 'Send Message →', sending: 'Sending...', sent: '✓ Message Sent!' };

export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  // Demo-only: no backend yet. Wire this to Formspree / EmailJS / an API route later.
  const submit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <form className="contact-form reveal reveal-delay-2" onSubmit={submit}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="cf-name">Name</label>
          <input id="cf-name" className="form-input" type="text" placeholder="Your name" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="cf-email">Email</label>
          <input id="cf-email" className="form-input" type="email" placeholder="your@email.com" />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="cf-subject">Subject</label>
        <input id="cf-subject" className="form-input" type="text" placeholder="What's this about?" />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="cf-message">Message</label>
        <textarea id="cf-message" className="form-textarea" placeholder="Write your message here..." />
      </div>
      <button
        type="submit"
        className="form-submit"
        disabled={status !== 'idle'}
        style={status === 'sent' ? { background: '#219ebc' } : undefined}
      >
        {LABELS[status]}
      </button>
    </form>
  );
}
