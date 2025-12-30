import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartSidebar = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-gray-100 rounded-full p-8 mb-4">
                <ShoppingBag className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add some products to get started!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-primary-600 font-bold mb-2">
                      ${item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-gray-100 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-100 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full text-red-500 hover:bg-red-50 py-2 rounded-lg font-medium transition"
                >
                  Clear Cart
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-bold text-gray-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Shipping:</span>
              <span className="text-green-600 font-medium">
                {totalPrice >= 50 ? 'FREE' : '$5.00'}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-gray-200">
              <span>Total:</span>
              <span className="text-primary-600">
                ${(totalPrice + (totalPrice >= 50 ? 0 : 5)).toFixed(2)}
              </span>
            </div>

            {/* Free Shipping Message */}
            {totalPrice < 50 && (
              <p className="text-sm text-center text-gray-600 bg-accent-50 p-3 rounded-lg">
                Add ${(50 - totalPrice).toFixed(2)} more for FREE shipping! 🚚
              </p>
            )}

            {/* Checkout Button */}
            <button 
              onClick={handleCheckout}
              className="w-full btn-primary text-lg"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full btn-secondary"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;