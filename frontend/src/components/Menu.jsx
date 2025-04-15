import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaPen, FaNewspaper, FaImage, FaBook, FaSignOutAlt,FaCrown } from "react-icons/fa";

const Menu = ({ isOpen, onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const menuItems = [
    { path: `/profile/${user?._id}`, label: "Profile", icon: <FaUser className="mr-2" /> },
    { path: "/write", label: "Write", icon: <FaPen className="mr-2" /> },
    { path: "/news", label: "News", icon: <FaNewspaper className="mr-2" /> },
    { path: "/images", label: "Images", icon: <FaImage className="mr-2" /> },
    { path: `/myblogs/${user?._id}`, label: "My Blogs", icon: <FaBook className="mr-2" /> },
    { path: "/premium", label: "Premium", icon: <FaCrown className="mr-2 text-yellow-400" /> }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-800 w-56 z-50 flex flex-col absolute top-14 right-0 rounded-md p-2 shadow-xl border border-gray-700"
          >
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  onClick={onClose}
                  className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 text-sm w-full py-2 px-3 rounded transition-colors"
                >
                  <FaUser className="mr-2" /> Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={onClose}
                  className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 text-sm w-full py-2 px-3 rounded transition-colors"
                >
                  <FaPen className="mr-2" /> Register
                </Link>
              </>
            ) : (
              <>
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 text-sm w-full py-2 px-3 rounded transition-colors"
                  >
                    {item.icon} {item.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 text-sm w-full text-left py-2 px-3 rounded transition-colors"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Menu;