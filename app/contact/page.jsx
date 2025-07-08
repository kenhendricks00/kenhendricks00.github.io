'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await fetch('https://formspree.io/f/xzzgldzj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        const result = await response.json();
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-8">
        <section className="container">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto mb-3"></div>
            <p className="max-w-2xl mx-auto text-gray-300 text-sm">
              Have a project in mind? Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <div className="p-8 bg-[var(--color-card-bg)] rounded-xl shadow-lg">
                {success ? (
                  <div className="text-center p-6">
                    <div className="text-green-400 text-5xl mb-4">✓</div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-400 mb-6">Thank you for reaching out. I'll get back to you shortly.</p>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="btn btn-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-4 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg mb-4">
                        <p className="text-red-400">{error}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                        placeholder="Project Inquiry"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)] resize-none"
                        placeholder="Tell me about your project or inquiry..."
                      />
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary w-full ${loading ? 'opacity-70' : ''}`}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
