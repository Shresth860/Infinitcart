import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Shield, ShoppingBag, Settings, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-3xl font-bold text-foreground">My Profile</h1>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="mb-1 text-xl font-semibold text-foreground">{user?.email}</h2>
                  <Badge variant={isAdmin ? 'default' : 'secondary'}>{user?.role}</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{user?.email}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">Role</label>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{user?.role}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Quick Actions</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button variant="outline" asChild>
                        <Link to="/products">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Browse Products
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/cart">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          View Cart
                        </Link>
                      </Button>
                      {isAdmin && (
                        <Button variant="outline" asChild>
                          <Link to="/admin">
                            <Settings className="mr-2 h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
