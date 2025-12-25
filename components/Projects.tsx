'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Project data
const projects = [
  {
    id: 1,
    title: "Developer Portfolio",
    description: "A Portfolio for displaying Projects and Achievements.",
    category: "web",
    tags: ["React", "Tailwind", "Vite"],
    image: "/images/dev-portfolio.jpg",
    projectUrl: "https://github.com/kenhendricks00/minimal-portfolio",
    codeUrl: "https://github.com/kenhendricks00/minimal-portfolio"
  },
  {
    id: 2,
    title: "FixEmbed - Discord Bot",
    description: "A Discord bot that fixes the lack of embed of support in Discord.",
    category: "discord",
    tags: ["Python", "Discord.py", "API"],
    image: "/images/fixembed.jpg",
    projectUrl: "https://fixembed.app",
    codeUrl: "https://github.com/kenhendricks00/FixEmbed"
  },
  {
    id: 3,
    title: "FMHY SafeGuard",
    description: "An extension that detects starred, safe, unsafe or potentially unsafe sites using the FMHY Filterlist.",
    category: "extension",
    tags: ["Firefox", "Chromium", "Javascript"],
    image: "/images/fmhysafeguard.jpg",
    projectUrl: "https://github.com/fmhy/FMHY-SafeGuard",
    codeUrl: "https://github.com/fmhy/FMHY-SafeGuard"
  },
  {
    id: 4,
    title: "ken.tools",
    description: "A collection of useful web tools.",
    category: "web",
    tags: ["Next.js", "React", "Web Tools"],
    image: "/images/kentools.jpg",
    projectUrl: "https://ken.tools",
    codeUrl: "https://github.com/kenhendricks00/ken"
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  // Reset to first slide when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const itemsPerPage = 3;

  const nextSlide = () => {
    if (currentIndex < filteredProjects.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showLeftArrow = currentIndex > 0;
  const showRightArrow = filteredProjects.length > itemsPerPage && currentIndex < filteredProjects.length - itemsPerPage;

  return (
    <section id="projects" className="py-24 bg-[rgba(10,10,10,0.4)]">
      <div className="container relative">
        <h2 className="section-title">My Projects</h2>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          <button
            className={`filter-btn px-5 py-2 rounded-full ${filter === 'all' ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]' : 'bg-[var(--color-neutral)]'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn px-5 py-2 rounded-full ${filter === 'web' ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]' : 'bg-[var(--color-neutral)]'}`}
            onClick={() => setFilter('web')}
          >
            Web Development
          </button>
          <button
            className={`filter-btn px-5 py-2 rounded-full ${filter === 'discord' ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]' : 'bg-[var(--color-neutral)]'}`}
            onClick={() => setFilter('discord')}
          >
            Discord Bot
          </button>
          <button
            className={`filter-btn px-5 py-2 rounded-full ${filter === 'extension' ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]' : 'bg-[var(--color-neutral)]'}`}
            onClick={() => setFilter('extension')}
          >
            Extensions
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={!showLeftArrow}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[rgba(0,0,0,0.7)] p-3 rounded-full transition-all duration-300 -ml-5 md:-ml-20 ${showLeftArrow ? 'opacity-100 hover:bg-[var(--color-primary)] cursor-pointer' : 'opacity-0 cursor-default'}`}
            aria-label="Previous projects"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={!showRightArrow}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[rgba(0,0,0,0.7)] p-3 rounded-full transition-all duration-300 -mr-5 md:-mr-20 ${showRightArrow ? 'opacity-100 hover:bg-[var(--color-primary)] cursor-pointer' : 'opacity-0 cursor-default'}`}
            aria-label="Next projects"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="overflow-hidden mx-auto">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / itemsPerPage)}% - ${currentIndex * (2 / 3)}rem))`
              }}
            >
              {filteredProjects.map(project => (
                <div
                  key={project.id}
                  className="w-full md:w-[calc(33.333%-1.33rem)] flex-shrink-0 bg-[var(--color-card-bg)] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-[var(--color-neutral-light)] mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="bg-[rgba(61,90,254,0.1)] text-[var(--color-primary)] text-xs px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <a href={project.projectUrl} className="btn btn-sm">View Project</a>
                      {project.codeUrl && (
                        <a href={project.codeUrl} className="btn btn-sm btn-secondary">Source Code</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
