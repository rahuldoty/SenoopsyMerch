
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  features: string[];
  inStock: boolean;
  isFeatured: boolean;
}

// Mock product data
export const products: Product[] = [
  {
    id: "1",
    name: "Glitch Aesthetic Hoodie",
    description: "Premium quality hoodie featuring a unique glitch aesthetic design. Made from high-quality cotton blend for ultimate comfort.",
    price: 59.99,
    category: "hoodies",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Purple", "White"],
    features: [
      "80% cotton, 20% polyester",
      "Unisex modern fit",
      "Drawstring hood with custom senoopsy aglet",
      "Front kangaroo pocket",
      "Custom glitch senoopsy design"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "2",
    name: "Digital Dreams T-Shirt",
    description: "Lightweight t-shirt with a vibrant digital dreams print. Perfect for casual wear with a modern aesthetic.",
    price: 29.99,
    category: "t-shirts",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    features: [
      "100% premium cotton",
      "Relaxed fit",
      "Ribbed crew neck",
      "Double-stitched hem",
      "Custom digital dreams design"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "3",
    name: "Neon Pulse Sneakers",
    description: "Ultra-comfortable sneakers with a neon pulse design. Perfect for everyday wear with a distinctive style.",
    price: 89.99,
    category: "sneakers",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584735175315-9d5df23be3dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Purple/Black", "White/Neon"],
    features: [
      "Breathable mesh upper",
      "Cushioned insole",
      "Durable rubber outsole",
      "Padded collar for comfort",
      "Reflective details"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "4",
    name: "Cyber Punk Button-Up Shirt",
    description: "Stylish button-up shirt with a subtle cyber punk pattern. Perfect for a night out or casual office wear.",
    price: 49.99,
    category: "shirts",
    images: [
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598112152619-a3c79d38eb61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"],
    features: [
      "100% premium cotton",
      "Slim fit",
      "Button-down collar",
      "Chest pocket with subtle logo",
      "Unique geometric pattern"
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: "5",
    name: "Matrix Zip-Up Jacket",
    description: "Lightweight zip-up jacket inspired by the digital realm. Features a unique matrix pattern and comfortable fit.",
    price: 79.99,
    category: "jackets",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black/Green", "Black/Purple"],
    features: [
      "Water-resistant shell",
      "Full front zip",
      "Side pockets with hidden zippers",
      "Adjustable cuffs",
      "Digital matrix pattern on back"
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: "6",
    name: "Pixel Art Cap",
    description: "Stylish cap featuring pixel art design. Adjustable strap for a comfortable fit.",
    price: 24.99,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["One Size"],
    colors: ["Black", "Purple"],
    features: [
      "100% cotton twill",
      "Embroidered pixel design",
      "Adjustable strap with metal buckle",
      "Pre-curved bill",
      "Breathable eyelets"
    ],
    inStock: true,
    isFeatured: false
  }
];

// Get all products
export const getAllProducts = (): Promise<Product[]> => {
  return Promise.resolve(products);
};

// Get featured products
export const getFeaturedProducts = (): Promise<Product[]> => {
  return Promise.resolve(products.filter(product => product.isFeatured));
};

// Get product by ID
export const getProductById = (id: string): Promise<Product | undefined> => {
  return Promise.resolve(products.find(product => product.id === id));
};

// Get products by category
export const getProductsByCategory = (category: string): Promise<Product[]> => {
  return Promise.resolve(products.filter(product => product.category === category));
};

// Search products
export const searchProducts = (query: string): Promise<Product[]> => {
  const searchQuery = query.toLowerCase().trim();
  return Promise.resolve(
    products.filter(product => 
      product.name.toLowerCase().includes(searchQuery) || 
      product.description.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    )
  );
};
