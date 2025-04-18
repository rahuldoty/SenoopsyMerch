
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-senoopsy-black border-t border-senoopsy-purple/20 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-senoopsy-purple to-senoopsy-neon">
                SENOOPSY
              </span>
            </Link>
            <p className="mt-4 text-gray-400">
              Premium quality merchandise for the YouTube community. Unique designs, premium quality.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-senoopsy-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-senoopsy-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-senoopsy-purple transition-colors">
                <Youtube size={20} />
              </a>
              <a href="mailto:info@senoopsy.com" className="text-gray-400 hover:text-senoopsy-purple transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop Column */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-400 hover:text-senoopsy-purple transition-colors">All Products</Link></li>
              <li><Link to="/category/hoodies" className="text-gray-400 hover:text-senoopsy-purple transition-colors">Hoodies</Link></li>
              <li><Link to="/category/t-shirts" className="text-gray-400 hover:text-senoopsy-purple transition-colors">T-Shirts</Link></li>
              <li><Link to="/category/shirts" className="text-gray-400 hover:text-senoopsy-purple transition-colors">Shirts</Link></li>
              <li><Link to="/category/sneakers" className="text-gray-400 hover:text-senoopsy-purple transition-colors">Sneakers</Link></li>
            </ul>
          </div>
          
          {/* Help Column */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-gray-400 hover:text-senoopsy-purple transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-senoopsy-purple transition-colors">Returns</Link></li>
              <li><Link to="/size-guide" className="text-gray-400 hover:text-senoopsy-purple transition-colors">Size Guide</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-senoopsy-purple transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-senoopsy-purple transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Info Column */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-senoopsy-purple transition-colors">About Us</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-senoopsy-purple transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-senoopsy-purple transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-senoopsy-gray">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} SENOOPSY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
