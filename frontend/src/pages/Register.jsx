import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from 'axios';
import { URL } from '../url';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
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
          backgroundImage: "url('https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=3840&auto=format&fit=crop&q=90&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHVubG9jayUyMGNyZWF0aXZpdHl8ZW58MHx8MHx8fDA%3D')"
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between px-6 md:px-[200px] py-4 opacity-0 animate-fadeIn">
            <h1 className="text-lg md:text-xl font-extrabold text-white">
              <Link to="/">Blog Pulse</Link>
            </h1>
            <div className="text-white hover:text-gray-300 transition-transform duration-300 hover:scale-105">
              <Link to="/login">Login</Link>
            </div>
          </div>
          
          <div className="w-full flex justify-center items-center min-h-[80vh]">
            <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] bg-white bg-opacity-90 p-8 rounded-lg shadow-xl opacity-0 animate-fadeInUp">
              <div className="flex flex-col items-center mb-4 transition-transform duration-300 hover:scale-102">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png" 
                  alt="Register" 
                  className="w-16 h-16 mb-2"
                />
                <h1 className="text-xl font-bold text-gray-800">Create an account</h1>
              </div>
              
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200 focus:scale-101"
                type="text"
                placeholder="Enter your username"
              />
              
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200 focus:scale-101"
                type="text"
                placeholder="Enter your email"
              />
              
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200 focus:scale-101"
                type="password"
                placeholder="Enter your password"
              />
              
              <button
                onClick={handleRegister}
                className="w-full px-4 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-102 active:scale-98"
              >
                Register
              </button>
              
              {error && (
                <div className="text-red-500 text-sm transition-opacity duration-300 opacity-0 animate-fadeIn">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <div className="flex justify-center items-center space-x-3">
                <p className="text-gray-600">Already have an account?</p>
                <div className="transition-transform duration-300 hover:scale-105">
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add these animations to your global CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s forwards;
        }
      `}</style>
      
      <Footer />
    </>
  );
};

export default Register;