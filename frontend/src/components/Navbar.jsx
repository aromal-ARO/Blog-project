import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSearch = () => {
    navigate(prompt ? `?search=${prompt}` : "/");
    setMobileSearchVisible(false);
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-30"
    >
      {/* Logo/Brand */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center"
      >
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          BlogPulse
        </Link>
      </motion.div>

      {/* Search Bar (desktop) */}
      {path === "/" && (
        <motion.div 
          className={`hidden md:flex items-center transition-all duration-300 ${isSearchFocused ? 'bg-gray-700' : 'bg-gray-800'} rounded-full px-4 py-2 shadow-inner`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <BsSearch className="text-gray-400 mr-2" />
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="outline-none bg-transparent text-white placeholder-gray-400 w-40 md:w-64 transition-all duration-300"
            placeholder="Search articles..."
            type="text"
          />
          {prompt && (
            <motion.button
              onClick={handleSearch}
              className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Mobile Search Button */}
      {path === "/" && (
        <button 
          onClick={() => setMobileSearchVisible(true)}
          className="md:hidden text-gray-300 hover:text-white mr-4"
        >
          <BsSearch size={20} />
        </button>
      )}

      {/* Mobile Search Overlay */}
      {mobileSearchVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-40 flex items-center justify-center p-4 md:hidden">
          <div className="w-full max-w-md relative">
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-3">
              <BsSearch className="text-gray-400 mr-2" />
              <input
                autoFocus
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
                placeholder="Search articles..."
                type="text"
              />
              <button 
                onClick={() => setMobileSearchVisible(false)}
                className="text-gray-400 hover:text-white ml-2"
              >
                <FaTimes size={24} />
              </button>
            </div>
            {prompt && (
              <motion.button
                onClick={handleSearch}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Search
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {user ? (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/write" 
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Create Post
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/login" 
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                Login
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/register" 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                Register
              </Link>
            </motion.div>
          </>
        )}

        {user && (
          <div className="relative">
            <button 
              onClick={toggleMenu}
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600 transition-colors duration-200"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Menu isOpen={isMenuOpen} onClose={closeMenu} />
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-600 transition-colors duration-200"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <Menu isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </motion.nav>
  );
};

export default Navbar;