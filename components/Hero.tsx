'use client';

import Link from 'next/link';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="hero-content md:w-3/5">
            <h1>Hi, I'm <span className="highlight">Kenneth Hendricks</span></h1>
            <h2>Web Developer & Designer</h2>
            <p>I craft beautiful, functional websites with a focus on user experience.</p>
            <div className="cta-buttons">
              <Link href="#projects" className="btn btn-primary">View My Work</Link>
              <Link href="#contact" className="btn btn-secondary">Get In Touch</Link>
            </div>
          </div>
          <div className="hero-image md:w-2/5 flex justify-center mt-8 md:mt-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <img 
                src="/images/avatar.png" 
                alt="Kenneth Hendricks Avatar" 
                className="object-contain z-10 relative"
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
