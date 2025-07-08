'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
      padding: scrolled ? '10px 0' : '20px 0',
      boxShadow: scrolled ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none'
    }}>
      <div className="container">
        <Link href="/" className="logo no-underline hover:text-transparent">K</Link>
        <ul className={`nav-links ${isMenuActive ? 'active' : ''}`}>
          <li><Link href="/" className="active" onClick={() => setIsMenuActive(false)}>Home</Link></li>
          <li><Link href="/#about" onClick={() => setIsMenuActive(false)}>About</Link></li>
          <li><Link href="/#projects" onClick={() => setIsMenuActive(false)}>Projects</Link></li>
          <li><Link href="/#skills" onClick={() => setIsMenuActive(false)}>Skills</Link></li>
          <li><Link href="/#contact" onClick={() => setIsMenuActive(false)}>Contact</Link></li>
          <li>
            <Link 
              href="/services" 
              onClick={() => setIsMenuActive(false)}
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-4 py-2 rounded-md hover:brightness-110 hover:text-white transition-all"
            >
              Hire Me
            </Link>
          </li>
        </ul>
        <div className={`hamburger ${isMenuActive ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
