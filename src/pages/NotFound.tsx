
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 px-4 bg-senoopsy-black">
        <div className="text-center max-w-lg">
          <h1 className="text-8xl font-display font-bold text-senoopsy-purple animate-glitch">404</h1>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-6 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/">
                Go to Homepage
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/shop" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
