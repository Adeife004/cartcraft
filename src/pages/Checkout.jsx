import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Mail, Phone, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const shippingCost = totalPrice >= 50 ? 0 : 5;
  const tax = totalPrice * 0.1; // 10% tax
  const finalTotal = totalPrice + shippingCost + tax;

  // Redirect if cart is empty and order not placed
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to continue with checkout</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user && !orderPlaced) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Please login to continue</h2>
        <p className="text-gray-600 mb-8">You need to be logged in to place an order</p>
        <button onClick={() => openAuthModal('login')} className="btn-primary">
          Login
        </button>
      </div>
    );
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      // Prepare order data
      const orderPayload = {
        items: cartItems.map(item => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        shippingInfo,
        paymentInfo: {
          method: 'card',
          cardLastFour: paymentInfo.cardNumber.slice(-4),
          status: 'completed'
        },
        subtotal: totalPrice,
        shippingCost,
        tax,
        total: finalTotal
      };

      const response = await orderAPI.create(orderPayload);
      
      setOrderData(response.data.data);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Order failed:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }

    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: value
    });
  };

  // Order Success Screen
  if (orderPlaced) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container-custom py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-semibold text-gray-900">{orderData?.orderNumber || '#ORD-12345'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold text-gray-900">${finalTotal.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery Address</p>
                  <p className="font-semibold text-gray-900">{shippingInfo.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900">
                    {orderData?.deliveryDate 
                      ? new Date(orderData.deliveryDate).toLocaleDateString()
                      : '3-5 business days'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate('/')} className="btn-primary">
                Continue Shopping
              </button>
              <button onClick={() => navigate('/')} className="btn-secondary">
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Back Button */}
        <button
          onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <span className={`ml-2 font-medium hidden sm:inline ${
                currentStep >= 1 ? 'text-gray-900' : 'text-gray-500'
              }`}>
                Shipping
              </span>
            </div>

            <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className={`ml-2 font-medium hidden sm:inline ${
                currentStep >= 2 ? 'text-gray-900' : 'text-gray-500'
              }`}>
                Payment
              </span>
            </div>

            <div className={`h-1 w-16 ${currentStep >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>

            {/* Step 3 */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                3
              </div>
              <span className={`ml-2 font-medium hidden sm:inline ${
                currentStep >= 3 ? 'text-gray-900' : 'text-gray-500'
              }`}>
                Review
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary-600" />
                  Shipping Information
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-primary text-lg">
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary-600" />
                  Payment Information
                </h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      placeholder="John Doe"
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        maxLength="3"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-900">
                      Your payment information is encrypted and secure. We never store your full card details.
                    </p>
                  </div>

                  <button type="submit" className="w-full btn-primary text-lg">
                    Review Order
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                  
                  {/* Shipping Address */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                    <div className="text-gray-600">
                      <p>{shippingInfo.fullName}</p>
                      <p>{shippingInfo.address}</p>
                      <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                      <p>{shippingInfo.phone}</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                    <p className="text-gray-600">Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                  </div>
                </div>

                <button 
                  onClick={handlePlaceOrder} 
                  disabled={loading}
                  className="w-full btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : `Place Order - ${finalTotal.toFixed(2)}`}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-primary-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-primary-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;