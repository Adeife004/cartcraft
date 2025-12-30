import { ShoppingCart, Search, User, Menu, X, LogOut, Package, Heart, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const { user, openAuthModal, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <p>🎉 Free shipping on orders over $50!</p>
          <div className="hidden md:flex gap-4">
            <a href="#" className="hover:text-primary-200 transition">Track Order</a>
            <a href="#" className="hover:text-primary-200 transition">Help</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl shadow-md">
              C
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Cart<span className="text-primary-600">Craft</span>
            </h1>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* User Account */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 hover:text-primary-600 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                        <Package className="w-4 h-4" />
                        My Orders
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                        <Heart className="w-4 h-4" />
                        Wishlist
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={logout}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="hidden md:flex items-center gap-2 hover:text-primary-600 transition"
              >
                <User className="w-6 h-6" />
                <span className="text-sm font-medium">Account</span>
              </button>
            )}

            {/* Cart */}
            <button 
              onClick={toggleCart}
              className="relative hover:text-primary-600 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200">
        <div className="container-custom">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between py-3">
            <div className="flex gap-8">
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">Home</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">Shop</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">Categories</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">Deals</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">About</a>
            </div>
            <div className="flex items-center gap-2 text-accent-600 font-semibold">
              <span className="bg-accent-100 px-3 py-1 rounded-full text-sm">
                🔥 Hot Deals
              </span>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <a href="#" className="text-gray-700 hover:text-primary-600 font-medium py-2">Home</a>
                <a href="#" className="text-gray-700 hover:text-primary-600 font-medium py-2">Shop</a>
                <a href="#" className="text-gray-700 hover:text-primary-600 font-medium py-2">Categories</a>
                <a href="#" className="text-gray-700 hover:text-primary-600 font-medium py-2">Deals</a>
                <a href="#" className="text-gray-700 hover:text-primary-600 font-medium py-2">About</a>
                <a href="#" className="text-gray-700 hover:text-primary-600 font-medium py-2 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {user ? user.name : 'Account'}
                </a>
                {user && (
                  <button
                    onClick={logout}
                    className="text-red-600 hover:text-red-700 font-medium py-2 flex items-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;