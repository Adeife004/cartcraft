import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-16 md:py-24">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold">
                ✨ New Arrivals Just Dropped
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Discover Your
              <span className="text-primary-600"> Perfect</span>
              <br />
              <span className="text-accent-500">Products</span> Today
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Shop the latest trends and timeless classics. Quality products, 
              unbeatable prices, and fast delivery to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="btn-primary flex items-center gap-2 text-lg">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary text-lg">
                View Collections
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-bold text-primary-600">10K+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-600">5K+</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-600">50+</p>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative">
            {/* Main Image Placeholder */}
            <div className="relative bg-gradient-to-br from-primary-400 to-accent-400 rounded-3xl aspect-square overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-8xl mb-4">🛍️</div>
                  <p className="text-2xl font-bold">Featured Products</p>
                  <p className="text-lg opacity-90">Coming Soon</p>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white px-4 py-3 rounded-xl shadow-lg">
                <p className="text-sm text-gray-600">Up to</p>
                <p className="text-3xl font-bold text-accent-500">50% OFF</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-200 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $50</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-accent-100 text-accent-600 p-3 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure transactions</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-600">2-3 business days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;