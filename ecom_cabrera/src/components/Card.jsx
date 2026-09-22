import { Link } from 'react-router-dom';

export default function Card({ product, onAddToCart }) {
  return (
    <div className="bg-white border border-gray-900 rounded-none overflow-hidden flex flex-col justify-between">
      <div>

        <Link to={`/details/${product.id}`} className="block relative bg-white p-4">
          <span className="absolute top-3 left-3 text-[11px] uppercase tracking-wider bg-[#333333] text-white px-3 py-1 font-semibold z-10">
            {product.category}
          </span>
          <div className="w-full h-64 flex items-center justify-center overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </Link>


        <div className="bg-[#999999] p-5 border-t border-gray-900">
          <Link to={`/details/${product.id}`} className="block mb-6">
            <h3 className="text-sm font-bold text-white tracking-wide leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>


          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-extrabold text-white tracking-wider">
              ₱{product.price.toLocaleString()}
            </span>
            <button
              onClick={() => onAddToCart(product, 1)}
              className="bg-white hover:bg-gray-100 text-black text-[11px] font-bold tracking-wider uppercase px-4 py-2 border border-gray-300 shadow-sm transition-colors"
            >
              + ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}