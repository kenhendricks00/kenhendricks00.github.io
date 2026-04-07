'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const [showTimeline, setShowTimeline] = useState(false);
  const [timelineHeight, setTimelineHeight] = useState('0px');
  
  const toggleTimeline = () => {
    setShowTimeline(!showTimeline);
    
    // Scroll to timeline when opening
    if (!showTimeline) {
      setTimeout(() => {
        document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  return (
    <section id="about" className="about py-24">
      <div className="container">
        <h2 className="section-title text-center mb-12">About Me</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-3/5 mb-8 md:mb-0">
            <div className="about-text pr-0 md:pr-12">
              <p className="text-lg mb-8">I'm a passionate web developer with a keen eye for design and a commitment to creating seamless user experiences. With expertise in both front-end and back-end technologies, I build websites that not only look great but also perform exceptionally well.</p>
              <p className="text-lg mb-8">When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or enjoying outdoor activities.</p>
              
              <button 
                onClick={toggleTimeline} 
                className="btn btn-secondary flex items-center gap-2 mt-4"
              >
                {showTimeline ? 'Hide My Journey' : 'View My Journey'}
                <FontAwesomeIcon icon={showTimeline ? faChevronUp : faChevronDown} />
              </button>
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <div className="grid grid-cols-2 gap-5 max-w-md ml-auto">
              {/* Top row */}
              <div className="stat bg-[#111111] p-6 aspect-square rounded-lg text-center flex flex-col justify-center">
                <h3 className="highlight text-5xl font-bold mb-2">3+</h3>
                <p className="text-gray-300 text-sm">Years Experience</p>
              </div>
              <div className="stat bg-[#111111] p-6 aspect-square rounded-lg text-center flex flex-col justify-center">
                <h3 className="highlight text-5xl font-bold mb-2">25+</h3>
                <p className="text-gray-300 text-sm">Projects Completed</p>
              </div>
              
              {/* Bottom row */}
              <div className="stat bg-[#111111] p-6 aspect-square rounded-lg text-center flex flex-col justify-center">
                <h3 className="highlight text-5xl font-bold mb-2">10+</h3>
                <p className="text-gray-300 text-sm">Happy Clients</p>
              </div>
              <div></div> {/* Empty cell */}
            </div>
          </div>
        </div>
        
        {/* Timeline Section - Hidden by default */}
        <div className={`timeline-container overflow-hidden transition-all duration-500 ease-in-out ${showTimeline ? 'max-h-[2000px] opacity-100 mt-16' : 'max-h-0 opacity-0'}`}>
          <div className="timeline-wrapper py-8 px-4 bg-[#111111] rounded-lg">
            <h3 className="text-2xl font-bold mb-8 text-center">My Journey</h3>
            
            <div className="timeline relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] animate-growDown origin-top z-2"></div>
              
              {/* Timeline Items */}
              <div className="timeline-item flex flex-col md:flex-row md:justify-between mb-16 animate-fadeIn">
                <div className="timeline-date md:w-5/12 p-4 md:text-right relative z-20">
                  <h4 className="highlight text-xl font-bold">2025 - Present</h4>
                </div>
                <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] z-30"></div>
                <div className="timeline-content md:w-5/12 p-4 bg-black bg-opacity-50 rounded-lg relative z-20">
                  <h4 className="text-xl font-bold">Bachelor's Degree in Computer Science</h4>
                  <p className="text-gray-300">I've completed my Associate's Degree in Computer Science and am now attending La Salle University to earn my Bachelor's. I'm diving deeper into topics like software engineering, algorithms, data structures, and cybersecurity while continuing to hone my programming skills and personal projects.</p>
                </div>
              </div>
              
              <div className="timeline-item flex flex-col md:flex-row md:justify-between mb-16">
                <div className="timeline-date md:w-5/12 p-4 md:text-right relative z-20">
                  <h4 className="highlight text-xl font-bold">2023 - 2025</h4>
                </div>
                <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] z-30"></div>
                <div className="timeline-content md:w-5/12 p-4 bg-black bg-opacity-50 rounded-lg relative z-20">
                  <h4 className="text-xl font-bold">Associate's Degree in Computer Science</h4>
                  <p className="text-gray-300">I'm currently attending the Community College of Philadelphia and pursuing the knowledge that a computer science degree has to offer. I'm learning about computer architecture, computer science theory, an array of programming, and aspects of artificial intelligence.</p>
                </div>
              </div>
              
              <div className="timeline-item flex flex-col md:flex-row md:justify-between mb-16">
                <div className="timeline-date md:w-5/12 p-4 md:text-right relative z-20">
                  <h4 className="highlight text-xl font-bold">2014 - 2018</h4>
                </div>
                <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] z-30"></div>
                <div className="timeline-content md:w-5/12 p-4 bg-black bg-opacity-50 rounded-lg relative z-20">
                  <h4 className="text-xl font-bold">Highschool</h4>
                  <p className="text-gray-300">I attended New Foundations Charter Highschool, a college prep school, there I took an Engineering class where it was reinforced that I loved the idea of creating something that is useful to people, ultimately earning a 94 in this class.</p>
                </div>
              </div>
              
              <div className="timeline-item flex flex-col md:flex-row md:justify-between animate-fadeIn" style={{animationDelay: '0.8s'}}>
                <div className="timeline-date md:w-5/12 p-4 md:text-right relative z-20">
                  <h4 className="highlight text-xl font-bold">2011</h4>
                </div>
                <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] z-30"></div>
                <div className="timeline-content md:w-5/12 p-4 bg-black bg-opacity-50 rounded-lg relative z-20">
                  <h4 className="text-xl font-bold">First Line of Code</h4>
                  <p className="text-gray-300">I wrote my first line of real code that started this journey into digital craftsmanship that I never could've imagined, especially as someone who never saw themselves as anything other than a blue collar worker.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
