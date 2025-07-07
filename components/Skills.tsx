'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHtml5, faCss3Alt, faJs, faReact, faVuejs, 
  faNodeJs, faPython, faGitAlt, faFigma, faDocker
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faServer, faCodeBranch, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const Skills = () => {
  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        { name: "HTML5", icon: faHtml5 },
        { name: "CSS3", icon: faCss3Alt },
        { name: "JavaScript", icon: faJs },
        { name: "React", icon: faReact },
        { name: "Vue.js", icon: faVuejs },
      ]
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", icon: faNodeJs },
        { name: "Python", icon: faPython },
        { name: "MongoDB", icon: faDatabase },
        { name: "Express", icon: faServer },
        { name: "SQL", icon: faDatabase },
      ]
    },
    {
      name: "Tools & Others",
      skills: [
        { name: "Git", icon: faGitAlt },
        { name: "Figma", icon: faFigma },
        { name: "Docker", icon: faDocker },
        { name: "CI/CD", icon: faCodeBranch },
        { name: "Responsive Design", icon: faMobileAlt },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="skills-category">
              <h3 className="text-center mb-6 text-[var(--color-neutral-light)]">{category.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex flex-col items-center text-center group">
                    <FontAwesomeIcon 
                      icon={skill.icon} 
                      className="text-4xl mb-3 text-[var(--color-primary)] transition-all duration-300 group-hover:transform group-hover:-translate-y-1 group-hover:text-[var(--color-secondary)]" 
                    />
                    <p className="text-sm">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
