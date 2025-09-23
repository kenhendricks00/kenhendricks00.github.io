'use client';

import { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to FormSpree
      const response = await fetch("https://formspree.io/f/mpwrenqw", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        setSubmitMessage('Thanks for your message! I\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again later.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-24 bg-[rgba(10,10,10,0.4)]">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <div className="flex flex-col space-y-8">
              <div className="flex items-start space-x-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-[var(--color-primary)] text-xl mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <a href="mailto:hello@kenhendricks.me" className="text-gray-300 hover:text-[var(--color-primary)]">
                        hello@kenhendricks.me
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[var(--color-primary)] text-xl mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Location</h3>
                  <p>Philadelphia, PA</p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <a 
                  href="https://github.com/kenhendricks00" 
                  className="w-10 h-10 rounded-full bg-[var(--color-neutral)] flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)] hover:transform hover:-translate-y-1"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a 
                  href="https://linkedin.com/in/kennethhendricksjr" 
                  className="w-10 h-10 rounded-full bg-[var(--color-neutral)] flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)] hover:transform hover:-translate-y-1"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a 
                  href="https://twitter.com/KenHendricksJr" 
                  className="w-10 h-10 rounded-full bg-[var(--color-neutral)] flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)] hover:transform hover:-translate-y-1"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
              
              <div className="mt-8">
                <a 
                  href="/files/kenneth_hendricks_resume.pdf" 
                  download
                  className="btn btn-secondary flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faFileArrowDown} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <form 
              onSubmit={handleSubmit} 
              className="bg-[var(--color-card-bg)] p-6 rounded-lg shadow-lg"
            >
              {submitMessage && (
                <div className="mb-6 p-4 bg-opacity-10 bg-green-500 rounded-lg text-center">
                  {submitMessage}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="w-full p-3 bg-[var(--color-neutral)] rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="w-full p-3 bg-[var(--color-neutral)] rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                  className="w-full p-3 bg-[var(--color-neutral)] rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  className="w-full p-3 bg-[var(--color-neutral)] rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary btn-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
