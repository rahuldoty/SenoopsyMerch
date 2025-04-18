
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, Product } from '@/services/productService';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'hoodies', name: 'Hoodies' },
    { id: 't-shirts', name: 'T-Shirts' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'sneakers', name: 'Sneakers' },
    { id: 'jackets', name: 'Jackets' },
    { id: 'accessories', name: 'Accessories' },
  ];
  
  // Filter and search products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery === '' || 
                         product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-senoopsy-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                SHOP ALL PRODUCTS
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-senoopsy-purple to-senoopsy-neon mt-4"></div>
            </div>
            <p className="mt-4 md:mt-0 text-gray-400">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-senoopsy-gray rounded-lg p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full py-2 px-4 bg-senoopsy-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-senoopsy-purple"
                />
              </div>
              
              {/* Category Filter */}
              <div className="md:col-span-2 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={filterCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory(category.id)}
                    className={filterCategory === category.id ? '' : 'text-gray-400 border-gray-700'}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 rounded-full border-4 border-senoopsy-purple border-t-transparent animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-xl text-white mb-2">Something went wrong</h2>
              <p className="text-gray-400 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try again</Button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl text-white mb-2">No products found</h2>
              <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}>
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
