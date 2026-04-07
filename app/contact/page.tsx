'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Navbar from '../../components/Navbar';

export default function Contact() {
  
  interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    service: string;
    budget: string;
    timeline: string;
    additionalFeatures: string[];
    totalQuote: string;
    maintenancePlan: string;
    promoCode: string;
    discountAmount: string;
  }
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    service: '',
    budget: '',
    timeline: '',
    additionalFeatures: [],
    totalQuote: '',
    maintenancePlan: '',
    promoCode: '',
    discountAmount: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Handle URL parameters for form pre-filling
  useEffect(() => {
    // Ensure this only runs in the browser environment
    if (typeof window !== 'undefined') {
      // Function to parse URL parameters
      const processUrlParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const service = urlParams.get('service');
        const budget = urlParams.get('budget');
        const timeline = urlParams.get('timeline');
        const features = urlParams.get('features');
        const businessGoal = urlParams.get('businessGoal');
        const maintenancePlan = urlParams.get('maintenancePlan');
        const promoCode = urlParams.get('promoCode');
        const discountAmount = urlParams.get('discountAmount');
        
        if (service || budget || timeline || features || maintenancePlan || promoCode) {
          setFormData(prev => ({
            ...prev,
            service: service || '',
            budget: budget || '',
            timeline: timeline || '',
            additionalFeatures: features ? features.split(',') : [],
            maintenancePlan: maintenancePlan || '',
            promoCode: promoCode || '',
            discountAmount: discountAmount || '',
            subject: service ? `Quote Request: ${service}` : prev.subject,
            message: `I'm interested in discussing a project with the following details:
${businessGoal ? `\nBusiness Goal: ${businessGoal}` : ''}
${service ? `\nService: ${service}` : ''}
${budget ? `\nBudget: $${budget}` : ''}
${timeline ? `\nTimeline: ${timeline}` : ''}
${features ? `\nFeatures: ${features.replace(/,/g, ', ')}` : ''}
${maintenancePlan && maintenancePlan !== 'none' ? `\nMaintenance Plan: ${maintenancePlan.charAt(0).toUpperCase() + maintenancePlan.slice(1)} Plan` : ''}
${promoCode ? `\nPromo Code Applied: ${promoCode}` : ''}
${discountAmount ? `\nDiscount Amount: $${discountAmount}` : ''}

`
          }));
        }
      };
      
      // Try immediately
      processUrlParams();
      
      // Also try after the window load event
      if (document.readyState !== 'complete') {
        window.addEventListener('load', processUrlParams);
        return () => window.removeEventListener('load', processUrlParams);
      }
    }
  }, []);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
          message: '',
          service: '',
          budget: '',
          timeline: '',
          additionalFeatures: [],
          totalQuote: '',
          maintenancePlan: '',
          promoCode: '',
          discountAmount: ''
        });
      } else {
        const result = await response.json();
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {/* Metadata handled by app/contact/layout.tsx */}
      
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="md:col-span-1">
              <div className="bg-[var(--color-card-bg)] p-4 rounded-lg shadow-lg h-full">
                <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-4">
                    <div className="text-[var(--color-primary)] mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a href="mailto:hello@kenhendricks.me" className="text-gray-300 hover:text-[var(--color-primary)]">
                        hello@kenhendricks.me
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-[var(--color-primary)] mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-gray-300">Philadelphia, PA</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Connect with me</h3>
                    <div className="flex space-x-4">
                      <a href="https://github.com/kenhendricks00" target="_blank" rel="noopener noreferrer" 
                         className="bg-[var(--color-background)] p-2 rounded-full hover:bg-gray-800 transition-all">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
                        </svg>
                      </a>
                      <a href="https://twitter.com/kenhendricksjr" target="_blank" rel="noopener noreferrer" 
                         className="bg-[var(--color-background)] p-2 rounded-full hover:bg-gray-800 transition-all">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                        </svg>
                      </a>
                      <a href="https://linkedin.com/in/kennethhendricksjr" target="_blank" rel="noopener noreferrer" 
                         className="bg-[var(--color-background)] p-2 rounded-full hover:bg-gray-800 transition-all">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-[var(--color-card-bg)] p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-3">Send a Message</h2>
                
                {success ? (
                  <div className="p-4 mb-6 bg-green-900 bg-opacity-20 border border-green-500 rounded-lg">
                    <p className="text-green-500 font-medium">Message sent successfully! I'll get back to you soon.</p>
                  </div>
                ) : null}
                
                {error ? (
                  <div className="p-4 mb-6 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg">
                    <p className="text-red-500 font-medium">{error}</p>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  
                  {/* Show these fields only if coming from quote form */}
                  {formData.service && (
                    <div className="p-4 bg-blue-900 bg-opacity-10 border border-blue-500 rounded-lg">
                      <h3 className="text-blue-400 font-medium mb-2">Quote Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Service:</span> {formData.service}
                        </div>
                        {formData.budget && (
                          <div>
                            <span className="text-gray-400">Estimated Budget:</span> ${formData.budget}
                          </div>
                        )}
                        {formData.timeline && (
                          <div>
                            <span className="text-gray-400">Timeline:</span> {formData.timeline}
                          </div>
                        )}
                        {formData.additionalFeatures && formData.additionalFeatures.length > 0 && (
                          <div className="md:col-span-2">
                            <span className="text-gray-400">Selected Features:</span> {formData.additionalFeatures.join(', ')}
                          </div>
                        )}
                        {formData.maintenancePlan && formData.maintenancePlan !== 'none' && (
                          <div className="md:col-span-2">
                            <span className="text-gray-400">Maintenance Plan:</span> {formData.maintenancePlan.charAt(0).toUpperCase() + formData.maintenancePlan.slice(1)} Plan
                            <span className="ml-2 text-green-500 text-xs">✓ First 3 months free</span>
                          </div>
                        )}
                        {formData.promoCode && (
                          <div className="md:col-span-2 mt-2 pt-2 border-t border-blue-800">
                            <span className="text-gray-400">Promo Code:</span> {formData.promoCode}
                            {formData.discountAmount && (
                              <span className="ml-4 text-green-500">Discount: ${formData.discountAmount}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
