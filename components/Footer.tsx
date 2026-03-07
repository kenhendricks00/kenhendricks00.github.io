'use client';

import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="py-12 bg-black border-t border-[rgba(255,255,255,0.1)]">
            <div className="container">
                <div className="footer-content flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="footer-logo">
                        <Link href="/" className="logo no-underline">K</Link>
                    </div>
                    <div className="footer-links flex gap-6 text-sm">
                        <Link href="/" className="hover:text-[var(--color-primary)] transition-all">Home</Link>
                        <Link href="/#about" className="hover:text-[var(--color-primary)] transition-all">About</Link>
                        <Link href="/#projects" className="hover:text-[var(--color-primary)] transition-all">Projects</Link>
                        <Link href="/#contact" className="hover:text-[var(--color-primary)] transition-all">Contact</Link>
                    </div>
                    <p className="copyright text-[var(--color-neutral-light)] text-sm">
                        &copy; {new Date().getFullYear()} Kenneth Hendricks. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
