import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productsAPI, Product } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Minus, Plus, ArrowLeft, Loader2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock product for demo
const getMockProduct = (id: string): Product => ({
  id,
  name: 'Wireless Bluetooth Headphones',
  description: 'Experience premium sound quality with our noise-cancelling wireless headphones. Features include 30-hour battery life, comfortable over-ear design, and advanced Bluetooth 5.0 connectivity. Perfect for music lovers, gamers, and professionals who demand the best audio experience.',
  price: 149.99,
  imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  category: 'Electronics',
  stock: 25,
});

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await productsAPI.getById(productId);
      setProduct(response.data);
    } catch {
      // Use mock product if API fails
      setProduct(getMockProduct(productId));
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`Added ${quantity} ${product.name} to cart`);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-foreground">Product Not Found</h1>
            <Button onClick={() => navigate('/products')}>Back to Products</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="overflow-hidden rounded-xl bg-muted">
              <img
                src={product.imageUrl || '/placeholder.svg'}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < 4 ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.0) • 128 reviews</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <p className="text-muted-foreground">{product.description}</p>

              {/* Stock Status */}
              <div>
                {product.stock > 0 ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    In Stock ({product.stock} available)
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              <Separator />

              {/* Quantity & Add to Cart */}
              {product.stock > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val >= 1 && val <= product.stock) {
                            setQuantity(val);
                          }
                        }}
                        className="w-16 text-center"
                        min={1}
                        max={product.stock}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </Button>
                </div>
              )}

              <Separator />

              {/* Features */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-5 w-5 text-primary" />
                  Free Shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  30-Day Returns
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

export default ProductDetails;
