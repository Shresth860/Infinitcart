import React, { useState, useEffect } from 'react';
import { productsAPI, Product } from '@/services/api';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';

// Mock products for demo (will be replaced by API)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    stock: 25,
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    stock: 15,
  },
  {
    id: '3',
    name: 'Premium Leather Jacket',
    description: 'Genuine leather jacket with modern slim fit design',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    category: 'Fashion',
    stock: 8,
  },
  {
    id: '4',
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    category: 'Home & Living',
    stock: 42,
  },
  {
    id: '5',
    name: 'Running Shoes Ultra',
    description: 'Lightweight running shoes with responsive cushioning technology',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    category: 'Sports',
    stock: 30,
  },
  {
    id: '6',
    name: 'Portable Power Bank',
    description: '20000mAh fast charging power bank with dual USB ports',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    category: 'Electronics',
    stock: 0,
  },
  {
    id: '7',
    name: 'Cotton T-Shirt Pack',
    description: 'Pack of 3 premium cotton t-shirts in classic colors',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Fashion',
    stock: 100,
  },
  {
    id: '8',
    name: 'Ceramic Plant Pot Set',
    description: 'Set of 3 modern ceramic pots for indoor plants',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
    category: 'Home & Living',
    stock: 20,
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports'];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchQuery, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch {
      // Use mock products if API fails
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">
              Browse our collection of {products.length} products
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-card/50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 md:max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">No products found</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
