'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#050505] py-8">
      <div className="container">
        <div className="footer-content flex justify-center items-center flex-col">
          <div className="logo text-3xl mb-2">K</div>
          <p className="text-center text-[var(--color-neutral-light)]">&copy; {currentYear} Kenneth Hendricks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
