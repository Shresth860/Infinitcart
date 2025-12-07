import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl || '/placeholder.svg'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute left-2 top-2" variant="secondary">
            Low Stock
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge className="absolute left-2 top-2" variant="destructive">
            Out of Stock
          </Badge>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button size="sm" variant="secondary" asChild>
            <Link to={`/products/${product.id}`}>
              <Eye className="mr-1 h-4 w-4" />
              View
            </Link>
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </div>
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </span>
        <Button
          size="sm"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-1 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};
