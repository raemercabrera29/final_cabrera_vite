import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import logoImg from '../assets/LOGO.jpg'; 

export default function Navbar({ cartCount, currentUser, onLogout }) {
  return (
    <header className="bg-neutral-950 border-b border-neutral-800/80 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        

        <Link 
          to="/" 
          className="flex items-center gap-3 group text-xl font-extrabold tracking-[0.25em] uppercase text-neutral-100 hover:text-neutral-400 transition"
        >
          <img 
            src={logoImg} 
            alt="ETOFFE.SUPPLY Logo" 
            className="w-8 h-8 object-cover border border-neutral-800 group-hover:border-neutral-400 transition" 
          />
          <span>ETOFFE.SUPPLY</span>
        </Link>


        <nav className="flex items-center gap-8 text-xs tracking-widest uppercase font-medium">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-neutral-100 underline underline-offset-8" : "text-neutral-400 hover:text-neutral-100 transition"
            }
          >
            Collection
          </NavLink>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => 
              `relative flex items-center gap-2 ${isActive ? "text-neutral-100" : "text-neutral-400 hover:text-neutral-100 transition"}`
            }
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            {cartCount > 0 && (
              <span className="bg-neutral-100 text-neutral-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          {currentUser ? (
            <div className="flex items-center gap-4 border-l border-neutral-800 pl-6">
              <span className="text-neutral-100 font-bold tracking-wider">{currentUser.fullName}</span>
              <button 
                onClick={onLogout} 
                className="text-neutral-500 hover:text-neutral-100 transition flex items-center gap-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <NavLink 
              to="/auth" 
              className={({ isActive }) => 
                `flex items-center gap-1.5 ${isActive ? "text-neutral-100" : "text-neutral-400 hover:text-neutral-100 transition"}`
              }
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}