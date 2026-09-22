import { Link } from 'react-router-dom';
import bannerImg from '../assets/BANNER.jpg'; 
export default function Cart({ cart, onUpdateQty, onRemove }) {
  if (cart.length === 0) {
    return (
      <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 overflow-hidden bg-neutral-950">

        <div className="absolute inset-0 z-0">
          <img
            src={bannerImg}
            alt="Background"
            className="w-full h-full object-cover opacity-20 pointer-events-none"
          />
        </div>


        <div className="relative z-10 bg-black/90 border border-neutral-800 p-12 w-full max-w-lg text-center space-y-4 shadow-2xl text-white backdrop-blur-sm">
          <h2 className="text-base font-extrabold tracking-widest text-white uppercase">
            SHOPPING BAG EMPTY
          </h2>
          <p className="text-xs text-neutral-400 tracking-wider">
            Select items from the main supply catalog.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-block bg-white text-black font-bold text-xs px-6 py-2.5 tracking-widest uppercase hover:bg-neutral-200 transition-colors"
            >
              VIEW COLLECTION
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative min-h-screen w-full py-12 px-4 overflow-hidden bg-neutral-950 flex items-center justify-center">

      <div className="absolute inset-0 z-0">
        <img
          src={bannerImg}
          alt="Background"
          className="w-full h-full object-cover opacity-20 pointer-events-none"
        />
      </div>


      <div className="relative z-10 max-w-4xl w-full mx-auto">
        <h1 className="text-xl font-black tracking-widest uppercase text-white text-center mb-8 drop-shadow-md">
          YOUR BAG ({cart.reduce((acc, item) => acc + item.quantity, 0)})
        </h1>

        <div className="bg-black/90 border border-neutral-800 p-6 space-y-4 text-white shadow-2xl backdrop-blur-sm">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-neutral-800 pb-4 last:border-0"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain bg-white border border-neutral-800 p-1"
                />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-semibold mt-1">
                    ₱{item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-neutral-900 border border-neutral-800 text-white px-2 py-1 gap-3">
                  <button
                    onClick={() => onUpdateQty(item.id, -1)}
                    className="text-xs font-bold hover:text-neutral-400 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQty(item.id, 1)}
                    className="text-xs font-bold hover:text-neutral-400 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => onRemove(item.id)}
                  className="text-xs font-bold text-neutral-400 hover:text-red-400 uppercase tracking-wider transition-colors"
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}

          <div className="border-t border-neutral-800 pt-4 flex justify-between items-center">
            <span className="text-xs font-bold tracking-widest uppercase text-neutral-400">
              TOTAL
            </span>
            <span className="text-sm font-black text-white">
              ₱{total.toLocaleString()}
            </span>
          </div>

          <Link
            to="/checkout"
            className="block w-full text-center bg-white text-black font-bold text-xs py-3 tracking-widest uppercase hover:bg-neutral-200 transition-colors"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
}