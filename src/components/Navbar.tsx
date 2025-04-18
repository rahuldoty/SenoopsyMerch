
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Hoodies', path: '/category/hoodies' },
    { name: 'T-Shirts', path: '/category/t-shirts' },
    { name: 'Sneakers', path: '/category/sneakers' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="relative z-50 backdrop-blur-md bg-senoopsy-black/80 border-b border-senoopsy-purple/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-senoopsy-purple to-senoopsy-neon">
              SENOOPSY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-white hover:text-senoopsy-purple transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-senoopsy-purple transition-colors">
              <Search size={20} />
            </button>
            <Link to="/account" className="text-white hover:text-senoopsy-purple transition-colors">
              <User size={20} />
            </Link>
            <Link 
              to="/cart" 
              className="relative text-white hover:text-senoopsy-purple transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-senoopsy-neon text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 md:hidden text-white hover:text-senoopsy-purple"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-senoopsy-black border-t border-senoopsy-purple/20 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-senoopsy-purple transition-colors py-2 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
