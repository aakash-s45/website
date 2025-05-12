"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles/FeedbackForm.module.css";

export default function FeedbackScreen() {
  const [name, setName] = useState<string>(''); 
  const [email, setEmail] = useState<string>(''); 
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<'sending' | 'sent' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

 const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (status === 'sending' || message.trim() === '') return

    setStatus('sending');
    setErrorMessage(null)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('sent');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again.'); // Set error message from response
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.'); 
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.prompt}>
          <span>Got a thought to share?</span>
        </h1>
      </div>
      <div className={styles.right}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name Field */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />

          {/* Message Field */}
          <textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className={styles.input}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.button}
            disabled={status === 'sending' || message.trim() === '' || !name || !email}
          >
            {status === 'sending'
              ? 'Sending…'
              : status === 'sent'
              ? 'Sent!'
              : 'Send'}
          </button>

          {/* Error/Success Message */}
          {status === 'error' && (
            <p className={styles.error}>{errorMessage || 'Something went wrong. Please try again.'}</p>
          )}

          {status === 'sent' && (
            <p className={styles.success}>Your message has been sent successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}