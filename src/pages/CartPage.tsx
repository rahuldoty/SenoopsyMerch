
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/useCart';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  
  // Shipping calculation (simplified)
  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-senoopsy-black">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
            YOUR CART
          </h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-senoopsy-gray rounded-lg">
              <h2 className="text-2xl text-white mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button size="lg" asChild>
                <Link to="/shop">START SHOPPING</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-senoopsy-gray rounded-lg overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-sm text-gray-400">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Subtotal</div>
                  </div>
                  
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-800">
                      {/* Product */}
                      <div className="md:col-span-6">
                        <div className="flex gap-4">
                          <Link to={`/product/${item.id}`} className="w-20 h-20 flex-shrink-0 bg-gray-800 rounded-md overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          <div>
                            <Link to={`/product/${item.id}`} className="font-medium text-white hover:text-senoopsy-purple">
                              {item.name}
                            </Link>
                            {(item.color || item.size) && (
                              <div className="text-sm text-gray-400 mt-1">
                                {item.color && <span>Color: {item.color}</span>}
                                {item.color && item.size && <span> / </span>}
                                {item.size && <span>Size: {item.size}</span>}
                              </div>
                            )}
                            
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center text-sm text-red-500 hover:text-red-400 mt-2"
                            >
                              <Trash2 size={14} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 md:text-center flex justify-between md:block">
                        <span className="md:hidden text-gray-400">Price:</span>
                        <span className="text-white font-medium">${item.price.toFixed(2)}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 md:text-center flex justify-between md:block">
                        <span className="md:hidden text-gray-400">Quantity:</span>
                        <div className="flex items-center md:justify-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-white"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-2 w-8 text-center text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="md:col-span-2 md:text-right flex justify-between md:block">
                        <span className="md:hidden text-gray-400">Subtotal:</span>
                        <span className="text-white font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <Link to="/shop" className="flex items-center text-senoopsy-purple hover:underline font-medium">
                    <ArrowLeft size={16} className="mr-2" />
                    Continue Shopping
                  </Link>
                  <Button onClick={clearCart} variant="outline">
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-senoopsy-gray rounded-lg p-6">
                  <h2 className="text-xl font-display font-bold text-white mb-6">ORDER SUMMARY</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span className="text-white font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-800 pt-4 mt-4">
                      <div className="flex justify-between text-white">
                        <span className="font-bold">Total</span>
                        <span className="font-mono font-bold">${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button size="lg" className="w-full mt-6">
                      PROCEED TO CHECKOUT
                    </Button>
                    
                    <p className="text-xs text-gray-400 text-center mt-4">
                      Shipping, taxes, and discounts calculated at checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
