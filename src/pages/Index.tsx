import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  ShoppingBag,
  Truck,
  Shield,
  CreditCard,
  ArrowRight,
  Star,
} from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on orders over $50',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure payment methods',
  },
  {
    icon: CreditCard,
    title: 'Easy Returns',
    description: '30-day money-back guarantee',
  },
];

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' },
  { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934- voices-0a9db3b72?w=400&h=300&fit=crop' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    content: 'Amazing quality products and super fast delivery. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Mike Chen',
    role: 'Verified Buyer',
    content: 'Best shopping experience I\'ve ever had. The customer service is outstanding.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Verified Buyer',
    content: 'Great prices and the products always exceed my expectations.',
    rating: 4,
  },
];

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                Discover Your
                <span className="text-primary"> Perfect Style</span>
              </h1>
              <p className="max-w-lg text-lg text-muted-foreground">
                Explore thousands of premium products at unbeatable prices. From fashion to electronics, find everything you need in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/signup">Create Account</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop"
                  alt="Shopping"
                  className="h-full w-full rounded-xl object-cover shadow-xl"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-card p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">10K+</p>
                    <p className="text-xs text-muted-foreground">Products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground">Browse our wide range of product categories</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/products"
                className="group overflow-hidden rounded-xl"
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardContent className="relative p-0">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/80 to-transparent p-4">
                      <h3 className="text-lg font-semibold text-card">{category.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">What Our Customers Say</h2>
            <p className="text-muted-foreground">Don't just take our word for it</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-card">
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center md:p-16">
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Start Shopping?
            </h2>
            <p className="mb-8 text-primary-foreground/80">
              Join thousands of happy customers today
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/products">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
