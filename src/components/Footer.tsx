import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">InfinitCart</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your one-stop destination for premium products. Discover endless possibilities with InfinitCart.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">FAQ</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Shipping Policy</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Returns & Refunds</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                support@infinitcart.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                123 Commerce St, City
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InfinitCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
