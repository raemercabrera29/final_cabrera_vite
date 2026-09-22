import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingBag } from 'lucide-react';
import { initialProducts } from '../data/products';

export default function Details({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const product = initialProducts.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-white">
        <div className="bg-black border border-black p-12 text-center text-neutral-400 space-y-4 shadow-xl">
          <p className="text-xs uppercase tracking-widest">Item archived or unavailable.</p>
          <button 
            onClick={() => navigate('/')} 
            className="text-xs underline text-white uppercase tracking-widest hover:text-neutral-300 transition"
          >
            Return to Vault
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-12 px-4 bg-white flex items-center justify-center">

      <div className="max-w-5xl w-full mx-auto space-y-6">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-xs text-neutral-600 hover:text-black transition uppercase tracking-widest font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-black border border-black p-8 shadow-2xl">

          <div className="bg-white p-4 flex items-center justify-center border border-neutral-800">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-96 object-contain" 
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">
                {product.category}
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight uppercase text-white">
                {product.name}
              </h1>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {product.description}
              </p>
              <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                Available Vault Stock: {product.stock} units
              </p>
            </div>
            
            <div className="space-y-6 border-t border-neutral-800 pt-6">
              <div className="text-2xl font-bold tracking-wider text-white">
                ₱{product.price.toLocaleString()}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-800 bg-neutral-900 text-white">
                  <button 
                    onClick={() => setQty((q) => Math.max(1, q - 1))} 
                    className="p-3 hover:bg-neutral-800 text-neutral-300 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-4 text-xs font-bold font-mono">{qty}</span>
                  <button 
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))} 
                    className="p-3 hover:bg-neutral-800 text-neutral-300 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => onAddToCart(product, qty)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-bold py-3 px-6 text-xs uppercase tracking-widest transition"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}