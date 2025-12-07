import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {
    toast.success('Proceeding to checkout...');
    // In a real app, this would navigate to a checkout page
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-3xl font-bold text-foreground">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="py-20 text-center">
              <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-semibold text-foreground">Your cart is empty</h2>
              <p className="mb-6 text-muted-foreground">
                Looks like you haven't added any items yet
              </p>
              <Button asChild>
                <Link to="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-0">
                    {items.map((item, index) => (
                      <div key={item.product.id}>
                        <div className="flex gap-4 p-4">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                            <img
                              src={item.product.imageUrl || '/placeholder.svg'}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <Link
                                to={`/products/${item.product.id}`}
                                className="font-semibold text-foreground hover:text-primary"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                {item.product.category}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity - 1)
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(item.product.id, parseInt(e.target.value) || 1)
                                  }
                                  className="h-8 w-14 text-center"
                                  min={1}
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity + 1)
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-semibold text-foreground">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                  onClick={() => removeFromCart(item.product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < items.length - 1 && <Separator />}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="mt-4 flex justify-end">
                  <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-lg font-semibold text-foreground">Order Summary</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-foreground">
                          {totalPrice >= 50 ? 'Free' : '$9.99'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span className="text-foreground">
                          ${(totalPrice * 0.1).toFixed(2)}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary">
                          $
                          {(
                            totalPrice +
                            (totalPrice >= 50 ? 0 : 9.99) +
                            totalPrice * 0.1
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button className="mt-6 w-full" onClick={handleCheckout}>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      Free shipping on orders over $50
                    </p>
                  </CardContent>
                </Card>

                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
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

export default Cart;
