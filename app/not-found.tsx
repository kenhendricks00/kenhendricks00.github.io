import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] text-[var(--color-foreground)] p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold mb-8">
          <span className="highlight">404</span>
        </h1>
        
        <h2 className="text-4xl font-bold mb-6">Page Not Found</h2>
        
        <p className="text-xl mb-8 text-gray-300">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        
        <div className="space-y-4">
          <Link href="/" className="btn btn-primary px-8 py-3">
            Return Home
          </Link>
        </div>
        
        <div className="mt-16 opacity-60">
          <p>Kenneth Hendricks</p>
        </div>
      </div>
      
      {/* Background decorative element */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-10 blur-[100px]"></div>
        </div>
      </div>
    </div>
  );
}
