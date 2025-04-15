import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      {/* Background with overlay */}
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=3840&auto=format&fit=crop&q=90&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D')"
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10 min-h-[80vh] flex flex-col">
          <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
            <h1 className="text-lg md:text-xl font-extrabold text-white">
              <Link to="/">Blog Pulse</Link>
            </h1>
            <h3 className="text-white hover:text-gray-300">
              <Link to="/register">Register</Link>
            </h3>
          </div>
          
          {/* Quote at top right with fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-24 right-8 md:right-24 w-64 text-right hidden md:block"
          >
            <p className="text-3xl font-light text-white italic leading-tight">
              "Creativity has no limits"
            </p>
            <div className="w-20 h-0.5 bg-white bg-opacity-50 ml-auto mt-3"></div>
          </motion.div>

          {/* Centered Login Form */}
          <div className="flex-1 flex justify-center items-center">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="w-[90%] md:w-[25%] bg-white bg-opacity-90 p-8 rounded-lg shadow-xl"
            >
              <div className="flex flex-col items-center mb-4">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png" 
                  alt="Login" 
                  className="w-16 h-16 mb-2"
                />
                <h1 className="text-xl font-bold text-gray-800">Log in to your account</h1>
              </div>
              
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                type="text"
                placeholder="Enter your email"
              />
              
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                type="password"
                placeholder="Enter your password"
              />
              
              <button
                onClick={handleLogin}
                className="w-full px-4 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
              >
                Log in
              </button>
              
              {error && (
                <h3 className="text-red-500 text-sm mb-4">
                  Something went wrong. Please try again.
                </h3>
              )}
              
              <div className="flex justify-center items-center space-x-3">
                <p className="text-gray-600">New here?</p>
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Register
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Login;