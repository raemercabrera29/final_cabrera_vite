import { useState } from 'react';
import Card from '../components/Card';
import { initialProducts } from '../data/products';
import bannerImg from '../assets/BANNER.jpg'; 

export default function Home({ onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  const categories = ['All', ...new Set(initialProducts.map((p) => p.category))];

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white text-black min-h-screen pb-16 w-full">

      <div className="relative w-full h-[60vh] md:h-[75vh] bg-neutral-900 overflow-hidden mb-8">
        <img
          src={bannerImg}
          alt="Hero Collection"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white text-black font-extrabold px-8 py-3 tracking-widest text-xs md:text-sm uppercase shadow-md">
            EXPLORE LUXURY BRAND
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 space-y-8">

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center border-b border-gray-200 pb-6 w-full">
          <input
            type="text"
            placeholder="SEARCH PRODUCTS..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full md:w-1/3 bg-gray-50 border border-gray-300 px-4 py-2.5 text-xs font-semibold tracking-wider text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
          />
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {displayedProducts.length === 0 ? (
          <div className="text-center py-20 text-xs font-bold tracking-widest text-gray-400 uppercase">
            No items found in current archive.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {displayedProducts.map((product) => (
              <Card key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}


        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 flex items-center justify-center text-xs font-extrabold transition-all border ${
                  currentPage === pageNum 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                0{pageNum}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}