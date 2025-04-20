'use client';

import { useState } from 'react';
import styles from './styles/FeedbackForm.module.css';


export default function FeedbackScreen() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    await new Promise((res) => setTimeout(res, 1000));
    setStatus('sent');
    setMessage('');
    setTimeout(() => setStatus('idle'), 3000);
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
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={status === 'sending' || message.trim() === ''}
          >
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent!' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
