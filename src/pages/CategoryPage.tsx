
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, Product } from '@/services/productService';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Format category name for display
  const formatCategoryName = (category: string = '') => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const categoryName = formatCategoryName(categoryId);
  
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        if (!categoryId) return;
        
        const categoryProducts = await getProductsByCategory(categoryId);
        setProducts(categoryProducts);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductsByCategory();
  }, [categoryId]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-senoopsy-black">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-senoopsy-purple">Home</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/shop" className="hover:text-senoopsy-purple">Shop</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white">{categoryName}</span>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
              {categoryName.toUpperCase()}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-senoopsy-purple to-senoopsy-neon mx-auto mt-4"></div>
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
              <Link 
                to="/shop" 
                className="inline-block px-4 py-2 rounded-md bg-senoopsy-purple text-white"
              >
                Back to Shop
              </Link>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl text-white mb-2">No products found</h2>
              <p className="text-gray-400 mb-4">
                We couldn't find any products in the {categoryName.toLowerCase()} category.
              </p>
              <Link 
                to="/shop" 
                className="inline-block px-4 py-2 rounded-md bg-senoopsy-purple text-white"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
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

export default CategoryPage;
