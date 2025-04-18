
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById, Product } from '@/services/productService';
import { useCart } from '@/hooks/useCart';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          setError('Product ID is missing');
          return;
        }
        
        const productData = await getProductById(id);
        
        if (!productData) {
          setError('Product not found');
          return;
        }
        
        setProduct(productData);
        setSelectedImage(productData.images[0]);
        setSelectedSize(productData.sizes[0]);
        setSelectedColor(productData.colors[0]);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-senoopsy-purple border-t-transparent animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-6">{error || 'Failed to load product'}</p>
            <Button asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-senoopsy-purple">Home</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/shop" className="hover:text-senoopsy-purple">Shop</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to={`/category/${product.category}`} className="hover:text-senoopsy-purple capitalize">
              {product.category}
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white">{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-senoopsy-gray">
                <img 
                  src={selectedImage} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square rounded-md overflow-hidden ${
                      selectedImage === image ? 'ring-2 ring-senoopsy-purple' : 'opacity-70'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                {product.name}
              </h1>
              
              <span className="block text-2xl font-mono font-bold text-white mb-6">
                ${product.price.toFixed(2)}
              </span>
              
              <div className="prose prose-sm prose-invert mb-8">
                <p>{product.description}</p>
              </div>
              
              {/* Product Options */}
              <div className="space-y-6">
                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border ${
                          selectedSize === size 
                            ? 'border-senoopsy-purple bg-senoopsy-purple/10 text-white' 
                            : 'border-gray-700 text-gray-300 hover:border-gray-500'
                        } rounded-md transition-colors`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border ${
                          selectedColor === color 
                            ? 'border-senoopsy-purple bg-senoopsy-purple/10 text-white' 
                            : 'border-gray-700 text-gray-300 hover:border-gray-500'
                        } rounded-md transition-colors`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-2 border border-gray-700 rounded-l-md hover:bg-gray-800"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-16 p-2 border-y border-gray-700 text-center bg-transparent"
                      min="1"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 border border-gray-700 rounded-r-md hover:bg-gray-800"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart */}
                <Button 
                  onClick={handleAddToCart} 
                  className="w-full py-6 text-lg flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2" />
                  Add to Cart
                </Button>
                
                {/* Features */}
                <div className="mt-8 border-t border-gray-800 pt-6">
                  <h3 className="font-medium text-white mb-2">Features</h3>
                  <ul className="text-sm space-y-1 text-gray-300">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-senoopsy-purple">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
