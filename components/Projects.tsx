'use client';

import { useState } from 'react';
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
    projectUrl: "https://www.kenhendricks.me/FixEmbed",
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
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-24 bg-[rgba(10,10,10,0.4)]">
      <div className="container">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-[var(--color-card-bg)] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
              <div className="h-48 relative overflow-hidden">
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{objectFit: 'cover'}}
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
    </section>
  );
};

export default Projects;
