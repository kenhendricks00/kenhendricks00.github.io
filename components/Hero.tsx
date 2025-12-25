'use client';

import Link from 'next/link';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        {/* For large screens and up - side by side layout */}
        <div className="hidden lg:flex lg:flex-row items-center justify-between">
          <div className="hero-content w-3/5 text-left">
            <h1 className="text-5xl">Hi, I'm <span className="highlight">Kenneth Hendricks</span></h1>
            <h2 className="text-3xl">Web Developer & Designer</h2>
            <p className="text-xl">I craft beautiful, functional websites with a focus on user experience.</p>
            <div className="cta-buttons flex flex-row gap-6 justify-start">
              <Link href="#projects" className="btn btn-primary">View My Work</Link>
              <Link href="#contact" className="btn btn-secondary">Get In Touch</Link>
            </div>
          </div>
          <div className="hero-image w-2/5 flex justify-center">
            <div className="relative w-80 h-80">
              <img 
                src="/images/avatar.png" 
                alt="Kenneth Hendricks Avatar" 
                className="object-contain z-10 relative max-w-full h-auto"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
        
        {/* For small and medium screens - stacked layout */}
        <div className="flex flex-col items-center lg:hidden">
          <div className="hero-content w-full text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl">Hi, I'm <span className="highlight">Kenneth Hendricks</span></h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl">Web Developer & Designer</h2>
            <p className="text-base sm:text-lg md:text-xl px-4">I craft beautiful, functional websites with a focus on user experience.</p>
            <div className="cta-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8">
              <Link href="#projects" className="btn btn-primary">View My Work</Link>
              <Link href="#contact" className="btn btn-secondary">Get In Touch</Link>
            </div>
          </div>
          
          {/* Avatar hidden on extra small screens, visible on small screens and up */}
          <div className="hero-image w-full flex justify-center mt-8">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
              <img 
                src="/images/avatar.png" 
                alt="Kenneth Hendricks Avatar" 
                className="object-contain z-10 relative max-w-full h-auto"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-backdrop">
        <div className="gradient-sphere"></div>
      </div>
    </section>
  );
};

export default Hero;
