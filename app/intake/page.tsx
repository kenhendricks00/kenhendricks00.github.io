'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '../../components/Navbar';

export default function ClientIntake() {
  interface IntakeFormData {
    // Client Information
    clientName: string;
    companyName: string;
    email: string;
    phone: string;
    website: string;
    
    // Project Overview
    projectType: string;
    projectGoals: string;
    targetAudience: string;
    uniqueSellingPoints: string;
    
    // Design Preferences
    designStyle: string;
    colorPreferences: string;
    referenceWebsites: string;
    inspirationImages: string;
    
    // Content & Features
    requiredPages: string[];
    specificFeatures: string[];
    contentReady: string;
    logoExists: string;
    
    // Technical Requirements
    domainHosting: string;
    integrations: string;
    specialRequirements: string;
    
    // Timeline & Budget
    launchDeadline: string;
    contentDeadline: string;
    additionalNotes: string;
  }

  const [formData, setFormData] = useState<IntakeFormData>({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    website: '',
    projectType: '',
    projectGoals: '',
    targetAudience: '',
    uniqueSellingPoints: '',
    designStyle: '',
    colorPreferences: '',
    referenceWebsites: '',
    inspirationImages: '',
    requiredPages: [],
    specificFeatures: [],
    contentReady: '',
    logoExists: '',
    domainHosting: '',
    integrations: '',
    specialRequirements: '',
    launchDeadline: '',
    contentDeadline: '',
    additionalNotes: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const designStyles = [
    'Modern & Minimalist',
    'Bold & Creative',
    'Professional & Corporate',
    'Elegant & Sophisticated',
    'Fun & Playful',
    'Industrial & Edgy',
    'Classic & Traditional',
    'Other (please specify)'
  ];

  const commonPages = [
    'Home', 'About', 'Services', 'Portfolio/Gallery', 'Contact',
    'Blog', 'FAQ', 'Testimonials', 'Team', 'Pricing',
    'Privacy Policy', 'Terms of Service', 'Other'
  ];

  const commonFeatures = [
    'Contact Forms', 'Online Booking/Scheduling', 'E-commerce/Shopping Cart',
    'Blog/News Section', 'Photo Gallery', 'Video Integration',
    'Social Media Integration', 'Newsletter Signup', 'Live Chat',
    'Search Functionality', 'Multi-language Support', 'User Accounts/Login',
    'Payment Processing', 'Analytics Integration', 'SEO Optimization'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: keyof IntakeFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: Array.isArray(prev[name])
        ? (prev[name] as string[]).includes(value)
          ? (prev[name] as string[]).filter(item => item !== value)
          : [...(prev[name] as string[]), value]
        : prev[name]
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('https://formspree.io/f/mldpebgk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          subject: `Client Intake Form - ${formData.companyName || formData.clientName}`,
          _subject: `Client Intake Form - ${formData.companyName || formData.clientName}`
        })
      });

      if (response.ok) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (err) {
      setError('Failed to submit form. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-8">
        <section className="container max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Client Intake Form</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto mb-4"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Thank you for choosing our web design services! Please fill out this form to help us understand your vision and requirements for your project.
            </p>
          </div>

          {success ? (
            <div className="bg-green-900 bg-opacity-20 border border-green-500 rounded-lg p-6 mb-8">
              <h2 className="text-green-500 font-semibold text-xl mb-2">Thank You!</h2>
              <p className="text-green-400">
                Your intake form has been submitted successfully. We'll review your information and get back to you within 24 hours to discuss next steps.
              </p>
            </div>
          ) : (
            <div className="bg-[var(--color-card-bg)] rounded-lg shadow-lg p-6">
              {error && (
                <div className="bg-red-900 bg-opacity-20 border border-red-500 rounded-lg p-4 mb-6">
                  <p className="text-red-500 font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Client Information */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Client Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="clientName" className="block text-sm font-medium mb-2">Your Name *</label>
                      <input
                        type="text"
                        id="clientName"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium mb-2">Company/Business Name *</label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="website" className="block text-sm font-medium mb-2">Current Website (if any)</label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://www.example.com"
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Overview */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Project Overview</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2">Project Type *</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      >
                        <option value="">Select project type</option>
                        <option value="new-website">New Website</option>
                        <option value="redesign">Website Redesign</option>
                        <option value="ecommerce">E-commerce Store</option>
                        <option value="landing-page">Landing Page</option>
                        <option value="portfolio">Portfolio Site</option>
                        <option value="blog">Blog/Content Site</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="projectGoals" className="block text-sm font-medium mb-2">What are your main goals for this website? *</label>
                      <textarea
                        id="projectGoals"
                        name="projectGoals"
                        value={formData.projectGoals}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)] resize-none"
                        placeholder="e.g., Generate leads, showcase portfolio, sell products online, establish credibility..."
                      />
                    </div>
                    <div>
                      <label htmlFor="targetAudience" className="block text-sm font-medium mb-2">Who is your target audience? *</label>
                      <textarea
                        id="targetAudience"
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)] resize-none"
                        placeholder="Describe your ideal customers/visitors..."
                      />
                    </div>
                    <div>
                      <label htmlFor="uniqueSellingPoints" className="block text-sm font-medium mb-2">What makes your business unique?</label>
                      <textarea
                        id="uniqueSellingPoints"
                        name="uniqueSellingPoints"
                        value={formData.uniqueSellingPoints}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)] resize-none"
                        placeholder="What sets you apart from competitors?"
                      />
                    </div>
                  </div>
                </div>

                {/* Design Preferences */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Design Preferences</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="designStyle" className="block text-sm font-medium mb-2">Preferred Design Style *</label>
                      <select
                        id="designStyle"
                        name="designStyle"
                        value={formData.designStyle}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      >
                        <option value="">Select design style</option>
                        {designStyles.map(style => (
                          <option key={style} value={style}>{style}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="colorPreferences" className="block text-sm font-medium mb-2">Color Preferences</label>
                      <textarea
                        id="colorPreferences"
                        name="colorPreferences"
                        value={formData.colorPreferences}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)] resize-none"
                        placeholder="Describe your preferred colors, or colors to avoid..."
                      />
                    </div>
                    <div>
                      <label htmlFor="referenceWebsites" className="block text-sm font-medium mb-2">Reference Websites</label>
                      <textarea
                        id="referenceWebsites"
                        name="referenceWebsites"
                        value={formData.referenceWebsites}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)] resize-none"
                        placeholder="List websites you like and what you like about them..."
                      />
                    </div>
                  </div>
                </div>

                {/* Required Pages */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Required Pages & Features</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-3">Which pages do you need? *</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {commonPages.map(page => (
                          <label key={page} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.requiredPages.includes(page)}
                              onChange={() => handleCheckboxChange('requiredPages', page)}
                              className="w-4 h-4 text-[var(--color-primary)] bg-[var(--color-background)] border-gray-700 rounded focus:ring-[var(--color-primary)]"
                            />
                            <span className="text-sm">{page}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">What features do you need?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {commonFeatures.map(feature => (
                          <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.specificFeatures.includes(feature)}
                              onChange={() => handleCheckboxChange('specificFeatures', feature)}
                              className="w-4 h-4 text-[var(--color-primary)] bg-[var(--color-background)] border-gray-700 rounded focus:ring-[var(--color-primary)]"
                            />
                            <span className="text-sm">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content & Assets */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Content & Assets</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="contentReady" className="block text-sm font-medium mb-2">Is your content ready? *</label>
                      <select
                        id="contentReady"
                        name="contentReady"
                        value={formData.contentReady}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      >
                        <option value="">Select option</option>
                        <option value="ready">Yes, all content is ready</option>
                        <option value="partial">Some content is ready</option>
                        <option value="need-help">No, I need help with content creation</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="logoExists" className="block text-sm font-medium mb-2">Do you have a logo? *</label>
                      <select
                        id="logoExists"
                        name="logoExists"
                        value={formData.logoExists}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      >
                        <option value="">Select option</option>
                        <option value="yes">Yes, I have a logo</option>
                        <option value="no">No, I need a logo designed</option>
                        <option value="redesign">I have a logo but want it redesigned</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Technical Requirements */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Technical Requirements</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="domainHosting" className="block text-sm font-medium mb-2">Domain & Hosting Status</label>
                      <select
                        id="domainHosting"
                        name="domainHosting"
                        value={formData.domainHosting}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      >
                        <option value="">Select option</option>
                        <option value="have-both">I have both domain and hosting</option>
                        <option value="have-domain">I have a domain but need hosting</option>
                        <option value="need-both">I need both domain and hosting</option>
                        <option value="help-needed">I need help with this</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="integrations" className="block text-sm font-medium mb-2">Required Integrations</label>
                      <textarea
                        id="integrations"
                        name="integrations"
                        value={formData.integrations}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)] resize-none"
                        placeholder="e.g., Google Analytics, CRM systems, payment processors, email marketing tools..."
                      />
                    </div>
                    <div>
                      <label htmlFor="specialRequirements" className="block text-sm font-medium mb-2">Special Requirements</label>
                      <textarea
                        id="specialRequirements"
                        name="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)] resize-none"
                        placeholder="Any specific technical requirements, accessibility needs, or compliance requirements..."
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline & Additional Notes */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Timeline & Additional Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="launchDeadline" className="block text-sm font-medium mb-2">Desired Launch Date</label>
                        <input
                          type="date"
                          id="launchDeadline"
                          name="launchDeadline"
                          value={formData.launchDeadline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                        />
                      </div>
                      <div>
                        <label htmlFor="contentDeadline" className="block text-sm font-medium mb-2">When will content be ready?</label>
                        <input
                          type="date"
                          id="contentDeadline"
                          name="contentDeadline"
                          value={formData.contentDeadline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="additionalNotes" className="block text-sm font-medium mb-2">Additional Notes or Questions</label>
                      <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-[var(--color-background)] border border-gray-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)] resize-none"
                        placeholder="Anything else you'd like us to know about your project?"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn btn-primary w-full text-lg py-4 ${loading ? 'opacity-70' : ''}`}
                  >
                    {loading ? 'Submitting...' : 'Submit Intake Form'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
