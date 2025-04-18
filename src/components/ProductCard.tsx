
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/services/productService';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0]
    });
  };
  
  return (
    <div className={`product-card group ${featured ? 'flex flex-col md:flex-row gap-8' : ''}`}>
      <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : 'aspect-[3/4]'}`}>
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${featured ? 'rounded-t-lg md:rounded-lg' : 'rounded-t-lg'}`}
          />
        </Link>
        {product.isFeatured && !featured && (
          <div className="absolute top-4 right-4 bg-senoopsy-purple text-white text-xs font-bold px-2 py-1 rounded">
            FEATURED
          </div>
        )}
      </div>
      
      <div className={`p-4 ${featured ? 'md:w-1/2 flex flex-col justify-center' : ''}`}>
        {featured && (
          <span className="text-senoopsy-purple text-sm font-medium mb-2">FEATURED PRODUCT</span>
        )}
        
        <Link to={`/product/${product.id}`}>
          <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-lg'} font-display font-bold text-white hover:text-senoopsy-purple transition-colors`}>
            {product.name}
          </h3>
        </Link>
        
        {featured && (
          <p className="text-gray-400 mt-2 mb-4">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-white font-mono font-bold">
            ${product.price.toFixed(2)}
          </span>
          
          {featured ? (
            <div className="flex gap-3 mt-4">
              <Button variant="outline" asChild>
                <Link to={`/product/${product.id}`}>View Details</Link>
              </Button>
              <Button onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAddToCart}
              className="text-white hover:text-senoopsy-purple hover:bg-transparent"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
