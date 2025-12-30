import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Default product data if none provided
  const defaultProduct = {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 129.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    badge: 'Best Seller',
    discount: 35
  };

  const productData = product || defaultProduct;

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(productData);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    navigate(`/product/${productData.id}`);
  };

  const handleCardClick = () => {
    navigate(`/product/${productData.id}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      className="card group cursor-pointer overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Badge */}
      {productData.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            {productData.badge}
          </span>
        </div>
      )}

      {/* Discount Badge */}
      {productData.discount && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-primary-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
            -{productData.discount}%
          </span>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-12 right-3 z-10 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
      >
        <Heart
          className={`w-5 h-5 ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative bg-gray-100 aspect-square overflow-hidden">
        <img
          src={productData.image}
          alt={productData.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400/7c3aed/ffffff?text=Product';
          }}
        />

        {/* Quick View Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={handleQuickView}
            className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition">
          {productData.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(productData.rating)}
          </div>
          <span className="text-sm text-gray-600">
            ({productData.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ${productData.price}
          </span>
          {productData.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ${productData.originalPrice}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              productData.inStock ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></div>
          <span
            className={`text-sm font-medium ${
              productData.inStock ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {productData.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!productData.inStock}
          className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
            productData.inStock
              ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {productData.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;