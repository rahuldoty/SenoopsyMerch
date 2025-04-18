
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedProducts, Product } from '@/services/productService';

const Hero = () => (
  <section className="relative bg-senoopsy-black text-white">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-senoopsy-black via-senoopsy-darkPurple/20 to-senoopsy-black opacity-80"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"></div>
    </div>
    
    <div className="container mx-auto px-4 py-24 md:py-40 relative">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 glitch-text">
          SENOOPSY STYLE SHOP
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Premium merchandise with unique designs for the YouTube community. Stand out with our exclusive collection.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" asChild className="neon-border group">
            <Link to="/shop">SHOP NOW</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/category/hoodies">LATEST COLLECTION</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const Categories = () => {
  const categories = [
    { name: 'Hoodies', path: '/category/hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { name: 'T-Shirts', path: '/category/t-shirts', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { name: 'Sneakers', path: '/category/sneakers', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { name: 'Accessories', path: '/category/accessories', image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  ];
  
  return (
    <section className="py-20 bg-senoopsy-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">SHOP BY CATEGORY</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-senoopsy-purple to-senoopsy-neon mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={category.path}
              className="relative group overflow-hidden rounded-lg h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-senoopsy-black to-transparent opacity-70 z-10"></div>
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <h3 className="text-xl font-display font-bold text-white mb-2">{category.name}</h3>
                <div className="w-12 h-0.5 bg-senoopsy-purple transition-all duration-300 group-hover:w-24"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <section className="py-20 bg-senoopsy-gray">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">FEATURED PRODUCTS</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-senoopsy-purple to-senoopsy-neon mt-4"></div>
          </div>
          <Link 
            to="/shop" 
            className="hidden md:flex items-center text-white hover:text-senoopsy-purple transition-colors"
          >
            View All <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="space-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} featured={true} />
          ))}
        </div>
        
        <div className="text-center mt-12 md:hidden">
          <Button asChild>
            <Link to="/shop">VIEW ALL PRODUCTS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => (
  <section className="py-20 bg-gradient-to-r from-senoopsy-black to-senoopsy-darkPurple">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">JOIN OUR COMMUNITY</h2>
        <p className="text-lg text-gray-300 mb-8">
          Subscribe to our newsletter to receive updates on new merch drops, exclusive offers, and behind-the-scenes content.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-senoopsy-gray text-white rounded-md focus:outline-none focus:ring-2 focus:ring-senoopsy-purple"
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </div>
  </section>
);

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error loading featured products:', error);
      }
    };
    
    loadFeaturedProducts();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        {featuredProducts.length > 0 && <FeaturedProducts products={featuredProducts} />}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
