'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Services() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteData, setQuoteData] = useState({
    businessGoal: '',
    additionalFeatures: [] as string[],
    websiteType: '',
    features: [] as string[],
    budget: '',
    timeline: '',
    totalPrice: 95, // Base price starts at $95
    promoCode: '',
    discountAmount: 0,
    discountApplied: false,
    maintenancePlan: 'none', // 'none', 'standard', or 'premium'
    maintenancePrice: 0, // Monthly price of selected plan
  });
  
  const toggleService = (serviceId: string) => {
    if (selectedService === serviceId) {
      setSelectedService(null);
    } else {
      setSelectedService(serviceId);
    }
  };

  const openQuoteModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeQuoteModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const handleBusinessGoalSelect = (goal: string) => {
    setQuoteData({...quoteData, businessGoal: goal});
    setCurrentStep(2);
  };

  const handleFeatureToggle = (feature: string, price: number) => {
    // Store the current discount state
    const discountApplied = quoteData.discountApplied;
    const discountAmount = quoteData.discountAmount;
    
    let newPrice;
    let newFeatures;
    
    if (quoteData.additionalFeatures.includes(feature)) {
      newFeatures = quoteData.additionalFeatures.filter(f => f !== feature);
      
      // Calculate the new base price (without discount)
      const newBasePrice = (quoteData.totalPrice + (discountApplied ? discountAmount : 0)) - price;
      
      // Calculate the new discount amount if applicable
      const newDiscountAmount = discountApplied ? Math.round(newBasePrice * 0.1) : 0;
      
      // Apply the discount to get the final price
      newPrice = discountApplied ? newBasePrice - newDiscountAmount : newBasePrice;
      
      setQuoteData({
        ...quoteData, 
        additionalFeatures: newFeatures,
        totalPrice: newPrice,
        discountAmount: discountApplied ? newDiscountAmount : 0
      });
    } else {
      newFeatures = [...quoteData.additionalFeatures, feature];
      
      // Calculate the new base price (without discount)
      const newBasePrice = (quoteData.totalPrice + (discountApplied ? discountAmount : 0)) + price;
      
      // Calculate the new discount amount if applicable
      const newDiscountAmount = discountApplied ? Math.round(newBasePrice * 0.1) : 0;
      
      // Apply the discount to get the final price
      newPrice = discountApplied ? newBasePrice - newDiscountAmount : newBasePrice;
      
      setQuoteData({
        ...quoteData, 
        additionalFeatures: newFeatures,
        totalPrice: newPrice,
        discountAmount: discountApplied ? newDiscountAmount : 0
      });
    }
  };

  const handleTimelineSelect = (timeline: string, additionalCost: number = 0) => {
    let basePrice = quoteData.totalPrice;
    const discountApplied = quoteData.discountApplied;
    const discountAmount = quoteData.discountAmount;
    if (discountApplied) {
      basePrice = basePrice + discountAmount;
    }
    if (quoteData.timeline === 'Express Timeline' || quoteData.timeline === 'Express (1-2 weeks)') {
      basePrice -= 50;
    } else if (quoteData.timeline === 'Regular Timeline' || quoteData.timeline === 'Regular (2-3 weeks)') {
      basePrice -= 25;
    }
    let newBasePrice = basePrice + additionalCost;
    let finalPrice = newBasePrice;
    if (discountApplied) {
      finalPrice = newBasePrice - discountAmount;
    }
    // Update quote data with the new timeline and recalculated price
    setQuoteData({
      ...quoteData, 
      timeline,
      totalPrice: finalPrice
    });
    setCurrentStep(4); // Go to maintenance plan step
  };

  const submitQuote = () => {
    // Prepare data to send to the contact form
    const params = new URLSearchParams();
    
    // Add all relevant quote information
    params.append('service', 'Custom Website Development');
    params.append('budget', quoteData.totalPrice.toString());
    params.append('timeline', quoteData.timeline);
    params.append('features', quoteData.additionalFeatures.join(','));
    params.append('businessGoal', quoteData.businessGoal);
    params.append('maintenancePlan', quoteData.maintenancePlan);
    if (quoteData.maintenancePlan !== 'none') {
      params.append('maintenancePrice', quoteData.maintenancePrice.toString());
    }
    
    closeQuoteModal();
    
    // Redirect to contact page with the quote data
    router.push(`/contact?${params.toString()}`);
  };
  
  const applyPromoCode = () => {
    // Prevent applying discount if already applied
    if (quoteData.discountApplied) {
      alert('Promo code has already been applied');
      return;
    }
    
    // Check if the promo code is valid
    if (quoteData.promoCode.toUpperCase() === 'FRIEND10') {
      // Calculate 10% discount
      const basePrice = quoteData.totalPrice;
      const discount = Math.round(basePrice * 0.1); // 10% discount rounded to nearest dollar
      
      setQuoteData({
        ...quoteData,
        discountAmount: discount,
        discountApplied: true,
        totalPrice: basePrice - discount
      });
    } else {
      // Invalid promo code
      setQuoteData({
        ...quoteData,
        discountApplied: false
      });
      alert('Invalid promo code');
    }
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuoteData({
      ...quoteData,
      promoCode: e.target.value
    });
  };

  const selectMaintenancePlan = (plan: 'none' | 'standard' | 'premium') => {
    const planPrices = {
      'none': 0,
      'standard': 20,
      'premium': 40
    };
    
    setQuoteData({
      ...quoteData,
      maintenancePlan: plan,
      maintenancePrice: planPrices[plan]
    });
    
    // Automatically advance to the next step after selection
    setCurrentStep(5);
  };
  
  const saveQuoteForLater = () => {
    // In a real app, you might save this to localStorage or a database
    // For now, we'll just close the modal
    closeQuoteModal();
    
    // You could show a toast notification here
    alert('Quote saved for later!');
  };
  
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="services-hero pt-32 pb-20 md:pt-40 md:pb-32 flex justify-center items-center">
        <div className="container px-4">
          <div className="text-center mx-auto w-full">
            <h1 className="font-bold mb-6 text-center max-w-full overflow-wrap-normal break-words">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="highlight block sm:inline">Crafting</span>
                <span className="block sm:inline sm:ml-2">Digital</span>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 sm:mt-0">
                Experiences That Matter
              </div>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300">
              Modern web solutions with a focus on React, Next.js, and cutting-edge technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#services" className="btn btn-primary">
                View Services
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            <div className="stat-card bg-[#111] p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all">
              <h3 className="highlight text-4xl md:text-5xl font-bold mb-2">25+</h3>
              <p className="text-gray-300">Projects Completed</p>
            </div>
            <div className="stat-card bg-[#111] p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all">
              <h3 className="highlight text-4xl md:text-5xl font-bold mb-2">3+</h3>
              <p className="text-gray-300">Years of Coding</p>
            </div>
            <div className="stat-card bg-[#111] p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all">
              <h3 className="highlight text-4xl md:text-5xl font-bold mb-2">15+</h3>
              <p className="text-gray-300">Technologies Mastered</p>
            </div>
            <div className="stat-card bg-[#111] p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all">
              <h3 className="highlight text-4xl md:text-5xl font-bold mb-2">100%</h3>
              <p className="text-gray-300">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="services-process py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My Development <span className="highlight">Philosophy</span>
          </h2>
          <p className="text-center text-xl mb-16 max-w-3xl mx-auto text-gray-300">
            I believe in a collaborative, transparent approach that keeps you involved at every step
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="process-card bg-[#111] p-6 rounded-lg hover:transform hover:scale-105 transition-all">
              <div className="process-number bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold text-xl">1</div>
              <h3 className="text-xl font-bold mb-3">Discovery</h3>
              <p className="text-gray-300">I start with in-depth conversations to understand your vision, target audience, and objectives. I'll ask the right questions to get to the core of what you need.</p>
            </div>
            
            <div className="process-card bg-[#111] p-6 rounded-lg hover:transform hover:scale-105 transition-all">
              <div className="process-number bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold text-xl">2</div>
              <h3 className="text-xl font-bold mb-3">Strategy</h3>
              <p className="text-gray-300">Using Figma for mockups and GitHub for project tracking, I'll create a detailed roadmap with milestones that align with your timeline and budget.</p>
            </div>
            
            <div className="process-card bg-[#111] p-6 rounded-lg hover:transform hover:scale-105 transition-all">
              <div className="process-number bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold text-xl">3</div>
              <h3 className="text-xl font-bold mb-3">Creation</h3>
              <p className="text-gray-300">I build with React, Next.js, and other modern frameworks, following clean code principles and implementing responsive designs that work on all devices.</p>
            </div>
            
            <div className="process-card bg-[#111] p-6 rounded-lg hover:transform hover:scale-105 transition-all">
              <div className="process-number bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold text-xl">4</div>
              <h3 className="text-xl font-bold mb-3">Launch & Support</h3>
              <p className="text-gray-300">After rigorous testing and optimization, I'll deploy your project and provide comprehensive documentation plus post-launch support to ensure everything runs smoothly.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our <span className="highlight">Services</span>
          </h2>
          <p className="text-center text-xl mb-16 max-w-3xl mx-auto text-gray-300">
            Tailored solutions to meet your specific development needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="service-card flex flex-col h-full bg-[#111] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[rgba(var(--rgb-primary),0.15)] hover:transform hover:scale-105 transition-all duration-300">
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4">Contract Development</h3>
                <p className="mb-6 text-gray-300 flex-grow">Expert development services to augment your team or complete specific projects. We work with your existing codebase and processes to deliver high-quality results.</p>
                <ul className="mb-6 text-gray-300">
                  <li className="mb-2 flex items-start">
                    <span className="text-[var(--color-primary)] mr-2">✓</span> Fixed scope and timeline
                  </li>
                  <li className="mb-2 flex items-start">
                    <span className="text-[var(--color-primary)] mr-2">✓</span> Transparent milestone tracking
                  </li>
                  <li className="mb-2 flex items-start">
                    <span className="text-[var(--color-primary)] mr-2">✓</span> Integration with your team
                  </li>
                </ul>
                <div className="price-tag my-6 text-center">
                  <p className="text-2xl font-bold highlight">Custom Quote</p>
                  <p className="text-sm text-gray-400">based on project scope</p>
                </div>
                <div className="mt-auto">
                  <Link href="/contact" className="btn btn-secondary block text-center">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Service Card 2 - Most Popular */}
            <div className="popular-service-card relative z-10 transform scale-105 hover:scale-110 transition-all duration-300 group">
              {/* Gradient glow background effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              {/* Card content */}
              <div className="service-card flex flex-col h-full bg-[#111] rounded-lg overflow-hidden relative z-10">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-sm font-medium py-1 px-3 rounded-full">
                Most Popular
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4">Custom Website Development</h3>
                <p className="mb-6 text-gray-300 flex-grow">End-to-end website development from concept to deployment. We create modern, responsive websites with cutting-edge technologies like Next.js and React.</p>
                <ul className="mb-6 text-gray-300">
                  <li className="mb-2 flex items-start">
                    <span className="text-[var(--color-primary)] mr-2">✓</span> Modern tech stack (Next.js/React)
                  </li>
                  <li className="mb-2 flex items-start">
                    <span className="text-[var(--color-primary)] mr-2">✓</span> Responsive design for all devices
                  </li>
                  <li className="mb-2 flex items-start">
                    <span className="text-[var(--color-primary)] mr-2">✓</span> SEO optimization
                  </li>
                  <li className="mb-2 flex items-start">
                    <span className="text-[var(--color-primary)] mr-2">✓</span> Performance optimization
                  </li>
                </ul>
                <div className="price-tag my-6 text-center">
                  <p className="text-2xl font-bold highlight">$95</p>
                  <p className="text-sm text-gray-400">starting price for complete websites</p>
                </div>
                <div className="mt-auto">
                  <button onClick={openQuoteModal} className="btn btn-primary block w-full text-center">
                    Get Started
                  </button>
                </div>
              </div>
              </div>
            </div>
            
            {/* Service Card 3 */}
            <div className="service-card flex flex-col h-full bg-[#111] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[rgba(var(--rgb-primary),0.15)] hover:transform hover:scale-105 transition-all duration-300">
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4">API Development</h3>
                <p className="mb-6 text-gray-300 flex-grow">Robust and scalable API solutions to power your applications. We design and implement RESTful or GraphQL APIs with a focus on security and performance.</p>
                <ul className="mb-6 text-gray-300">
                  <li className="mb-2 flex items-start">
                    <span className="text-[var(--color-primary)] mr-2">✓</span> RESTful or GraphQL APIs
                  </li>
                  <li className="mb-2 flex items-start">
                    <span className="text-[var(--color-primary)] mr-2">✓</span> Authentication and security
                  </li>
                  <li className="mb-2 flex items-start">
                    <span className="text-[var(--color-primary)] mr-2">✓</span> Detailed documentation
                  </li>
                </ul>
                <div className="price-tag my-6 text-center">
                  <p className="text-2xl font-bold highlight">$199</p>
                  <p className="text-sm text-gray-400">based on API complexity</p>
                </div>
                <div className="mt-auto">
                  <Link href="/contact" className="btn btn-secondary block text-center">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Let's Create <span className="highlight">Something Amazing</span>
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-300">
            Ready to elevate your web presence with a developer who cares about your success?
          </p>
          <Link href="/contact" className="btn btn-primary">
            Start Your Project
          </Link>
        </div>
      </section>
      
      <Footer />

      {/* Custom Quote Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center pt-16 pb-8 px-4">
          <div className="bg-[#0a0a0a] max-w-2xl w-full rounded-lg shadow-xl max-h-[85vh] relative">
            <div className="p-6 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(85vh - 2rem)' }}>
              <div className="quote-modal-header">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Get Your Estimate</h1>
                  <button 
                    onClick={closeQuoteModal}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="progress-bar mt-4">
                  <div 
                    className="progress-fill" 
                    style={{
                      width: `${(currentStep / 5) * 100}%`,
                      background: 'linear-gradient(to right, #8B5CF6, #3B82F6)',
                    }}
                  ></div>
                </div>
                <p className="text-right text-sm text-gray-400 mt-1">Step {currentStep} of 5</p>
              </div>
              {/* Modal Content - Different for each step */}
              {currentStep === 1 && (
                <div className="step-content space-y-6">
                  <h2 className="text-xl font-semibold">What's your primary business goal?</h2>
                  <p className="text-gray-400">This helps us understand your needs better (doesn't affect pricing)</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Generate Leads Option */}
                    <div 
                      className={`p-6 border ${quoteData.businessGoal === 'Generate Leads' ? 'border-purple-500' : 'border-gray-700'} rounded-lg cursor-pointer hover:border-purple-500 transition-colors`}
                      onClick={() => handleBusinessGoalSelect('Generate Leads')}
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-purple-500 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="6"></circle>
                            <circle cx="12" cy="12" r="2"></circle>
                          </svg>
                        </div>
                        <h3 className="font-medium text-center">Generate Leads</h3>
                        <p className="text-sm text-gray-400 mt-2 text-center">Optimized for lead capture and conversions</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-300">Contact forms</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-300">Call-to-action focused</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-300">Lead magnets</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Build Brand Awareness Option */}
                    <div 
                      className={`p-6 border ${quoteData.businessGoal === 'Build Brand Awareness' ? 'border-purple-500' : 'border-gray-700'} rounded-lg cursor-pointer hover:border-purple-500 transition-colors`}
                      onClick={() => handleBusinessGoalSelect('Build Brand Awareness')}
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-purple-500 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                          </svg>
                        </div>
                        <h3 className="font-medium text-center">Build Brand Awareness</h3>
                        <p className="text-sm text-gray-400 mt-2 text-center">Establish a strong online presence</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-300">Brand storytelling</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-300">Visual identity</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-300">Content sharing</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-right">
                    <button 
                      onClick={() => handleBusinessGoalSelect(quoteData.businessGoal || 'Generate Leads')}
                      className="btn btn-primary"
                      disabled={!quoteData.businessGoal}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="step-content space-y-6">
                  <h2 className="text-xl font-semibold">Select Additional Features</h2>
                  <p className="text-gray-400">Choose features to include in your custom website</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Feature</span>
                      <span>Price</span>
                    </div>
                    
                    {[
                      { name: 'Authentication System', price: 150 },
                      { name: 'Payment Integration', price: 200 },
                      { name: 'Blog/News Section', price: 100 },
                      { name: 'Contact Form', price: 50 },
                      { name: 'Image Gallery', price: 75 },
                      { name: 'Custom Admin Dashboard', price: 250 },
                      { name: 'Social Media Integration', price: 60 },
                      { name: 'Search Functionality', price: 80 }
                    ].map(feature => (
                      <div 
                        key={feature.name}
                        className={`p-4 border ${quoteData.additionalFeatures.includes(feature.name) ? 'border-purple-500' : 'border-gray-700'} rounded-lg cursor-pointer hover:border-purple-500 transition-colors`}
                        onClick={() => handleFeatureToggle(feature.name, feature.price)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-5 h-5 mr-3 rounded flex items-center justify-center ${quoteData.additionalFeatures.includes(feature.name) ? 'bg-purple-500' : 'border border-gray-500'}`}>
                              {quoteData.additionalFeatures.includes(feature.name) && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <span>{feature.name}</span>
                          </div>
                          <span className="text-sm font-medium text-purple-400">${feature.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg mt-8">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Current Estimate:</span>
                      <span className="text-xl font-bold">${quoteData.totalPrice}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Base price + selected features</p>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="btn btn-outline"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setCurrentStep(3)}
                      className="btn btn-primary"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="step-content space-y-6">
                  <h2 className="text-xl font-semibold">When do you need this completed?</h2>
                  <p className="text-gray-400">Timeline affects project pricing (faster delivery = higher priority)</p>
                  
                  <div className="space-y-4 mt-6">
                    <div 
                      className={`p-4 border ${quoteData.timeline === 'Standard (3-4 weeks)' ? 'border-purple-500' : 'border-gray-700'} rounded-lg cursor-pointer hover:border-purple-500 transition-colors`}
                      onClick={() => handleTimelineSelect('Standard (3-4 weeks)', 0)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Standard Timeline</h3>
                          <p className="text-sm text-gray-400">3-4 weeks delivery</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-400">No additional cost</span>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 border ${quoteData.timeline === 'Regular (2-3 weeks)' ? 'border-purple-500' : 'border-gray-700'} rounded-lg cursor-pointer hover:border-purple-500 transition-colors`}
                      onClick={() => handleTimelineSelect('Regular (2-3 weeks)', 25)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Regular Timeline</h3>
                          <p className="text-sm text-gray-400">2-3 weeks delivery</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-purple-400">+$25</span>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 border ${quoteData.timeline === 'Express (1-2 weeks)' ? 'border-purple-500' : 'border-gray-700'} rounded-lg cursor-pointer hover:border-purple-500 transition-colors`}
                      onClick={() => handleTimelineSelect('Express (1-2 weeks)', 50)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Express Timeline</h3>
                          <p className="text-sm text-gray-400">1-2 weeks delivery</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-purple-400">+$50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg mt-8">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Updated Estimate:</span>
                      <span className="text-xl font-bold">${quoteData.totalPrice}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Base price + features + timeline adjustment</p>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="btn btn-outline"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setCurrentStep(4)}
                      className="btn btn-primary"
                      disabled={!quoteData.timeline}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="step-content space-y-6">
                  <h2 className="text-xl font-semibold">Choose your post-launch maintenance option:</h2>
                  <p className="text-gray-400">The first 3 months of maintenance are included for free.</p>
                  
                  <div className="space-y-4 mt-6">
                    {/* No Maintenance Option */}
                    <div 
                      className={`border ${quoteData.maintenancePlan === 'none' ? 'border-purple-500' : 'border-gray-700'} rounded-lg p-5 cursor-pointer hover:border-purple-500 transition-colors`}
                      onClick={() => selectMaintenancePlan('none')}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">No Maintenance</h3>
                        <span className="text-md font-medium text-gray-400">$0/month</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">You'll manage updates, bug fixes, and content edits on your own.</p>
                    </div>
                    
                    {/* Standard Plan */}
                    <div 
                      className={`border ${quoteData.maintenancePlan === 'standard' ? 'border-purple-500' : 'border-gray-700'} rounded-lg p-5 cursor-pointer hover:border-purple-500 transition-colors`}
                      onClick={() => selectMaintenancePlan('standard')}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Standard Plan</h3>
                        <span className="text-md font-medium text-purple-400">$20/month</span>
                      </div>
                      <div className="mt-2">
                        <p className="font-medium text-sm text-gray-300 mb-2">Includes:</p>
                        <ul className="text-sm space-y-1 text-gray-400">
                          <li className="flex items-center">
                            <span className="text-purple-400 mr-2">•</span>
                            2 content edits/month (text, images, layout tweaks)
                          </li>
                          <li className="flex items-center">
                            <span className="text-purple-400 mr-2">•</span>
                            Bug fixes & stack updates
                          </li>
                          <li className="flex items-center">
                            <span className="text-purple-400 mr-2">•</span>
                            SEO & performance checks
                          </li>
                          <li className="flex items-center">
                            <span className="text-purple-400 mr-2">•</span>
                            Email support (48-hour response)
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Premium Plan */}
                    <div 
                      className={`border ${quoteData.maintenancePlan === 'premium' ? 'border-purple-500' : 'border-gray-700'} rounded-lg p-5 cursor-pointer hover:border-purple-500 transition-colors`}
                      onClick={() => selectMaintenancePlan('premium')}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Premium Plan</h3>
                        <span className="text-md font-medium text-purple-400">$40/month</span>
                      </div>
                      <div className="mt-2">
                        <p className="font-medium text-sm text-gray-300 mb-2">Includes everything in Standard, plus:</p>
                        <ul className="text-sm space-y-1 text-gray-400">
                          <li className="flex items-center">
                            <span className="text-purple-400 mr-2">•</span>
                            Priority support (24-hour response)
                          </li>
                          <li className="flex items-center">
                            <span className="text-purple-400 mr-2">•</span>
                            Uptime monitoring
                          </li>
                          <li className="flex items-center">
                            <span className="text-purple-400 mr-2">•</span>
                            Monthly report & insights
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#0d121f] rounded-lg p-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Updated Estimate:</span>
                      <span className="text-xl font-bold">${quoteData.totalPrice}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Base price + features + timeline adjustment + maintenance options</p>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button 
                      onClick={() => setCurrentStep(3)}
                      className="btn btn-outline"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setCurrentStep(5)}
                      className="btn btn-primary"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {currentStep === 5 && (
                <div className="step-content space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">Your Quote Summary</h2>
                      <p className="text-gray-400">Review your custom website quote</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex rounded-md overflow-hidden">
                        <input 
                          type="text" 
                          className="bg-[#181818] border-0 px-3 py-2 w-36 text-sm focus:outline-none rounded-l-md" 
                          placeholder="Promo Code"
                          value={quoteData.promoCode}
                          onChange={handlePromoCodeChange}
                        />
                        <button 
                          onClick={applyPromoCode}
                          className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-6 py-2 text-sm transition-all hover:opacity-90 border-0 rounded-r-md"
                        >
                          Apply
                        </button>
                      </div>
                      {quoteData.discountApplied && (
                        <p className="text-green-400 text-xs mt-1">10% discount applied!</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 mt-4">
                    <div className="space-y-4">
                      <div className="border-b border-gray-700 pb-4">
                        <h3 className="text-lg font-medium mb-1">Project Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <div>
                            <p className="text-gray-400">Business Goal:</p>
                            <p>{quoteData.businessGoal}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Timeline:</p>
                            <p>{quoteData.timeline}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b border-gray-700 pb-4">
                        <h3 className="text-lg font-medium mb-1">Selected Features</h3>
                        {quoteData.additionalFeatures.length > 0 ? (
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {quoteData.additionalFeatures.map(feature => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-400">No additional features selected</p>
                        )}
                      </div>
                      
                      {quoteData.maintenancePlan !== 'none' && (
                        <div className="border-b border-gray-700 pb-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium mb-1">Maintenance Plan</h3>
                            <span className="text-sm text-gray-400">✅ First 3 months free</span>
                          </div>
                          <div className="text-sm">
                            <p className="font-medium text-purple-400">
                              {quoteData.maintenancePlan === 'standard' ? 'Standard Plan' : 'Premium Plan'} - ${quoteData.maintenancePrice}/month
                            </p>

                            
                            {quoteData.maintenancePlan === 'standard' && (
                              <ul className="mt-2">
                                <li className="flex items-center"><span className="text-green-400 mr-2">•</span> 2 content edits/month</li>
                                <li className="flex items-center"><span className="text-green-400 mr-2">•</span> Bug fixes & stack updates</li>
                                <li className="flex items-center"><span className="text-green-400 mr-2">•</span> Email support (48h response)</li>
                              </ul>
                            )}
                            
                            {quoteData.maintenancePlan === 'premium' && (
                              <ul className="mt-2">
                                <li className="flex items-center"><span className="text-green-400 mr-2">•</span> Priority support (24h response)</li>
                                <li className="flex items-center"><span className="text-green-400 mr-2">•</span> Includes all Standard features</li>
                                <li className="flex items-center"><span className="text-green-400 mr-2">•</span> Uptime monitoring & monthly reports</li>
                              </ul>
                            )}
                          </div>
                        </div>
                      )}
                      

                      
                      <div className="pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium">Total Estimated Price:</span>
                          <div className="text-right">
                            {quoteData.discountApplied && (
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-400 line-through">${quoteData.totalPrice + quoteData.discountAmount}</span>
                                <span className="text-3xl font-bold text-purple-500">${quoteData.totalPrice}</span>
                              </div>
                            )}
                            {!quoteData.discountApplied && (
                              <span className="text-3xl font-bold text-purple-500">${quoteData.totalPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-400">Final pricing may vary based on project specifics</p>
                          {quoteData.discountApplied && (
                            <p className="text-green-400 text-sm">10% discount applied!</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 justify-between mt-8">
                    <button 
                      onClick={() => setCurrentStep(4)}
                      className="btn btn-outline"
                    >
                      Back
                    </button>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={saveQuoteForLater}
                        className="btn btn-secondary"
                      >
                        Save Quote for Later
                      </button>
                      <button 
                        onClick={submitQuote}
                        className="btn btn-primary"
                      >
                        Get in Touch
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
