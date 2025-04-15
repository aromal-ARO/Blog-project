import { motion } from "framer-motion";
import { FaHeart, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-12 pb-6"
    >
      <div className="container mx-auto px-6 md:px-[200px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="flex flex-col space-y-4"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              BlogPulse
            </h3>
            <p className="text-gray-300">
              Your premier destination for thought-provoking content and community engagement.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, color: "#1DA1F2" }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaTwitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, color: "#4267B2" }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaFacebook size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, color: "#E1306C" }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, color: "#0077B5" }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaLinkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="flex flex-col space-y-3"
          >
            <h4 className="text-lg font-semibold text-white mb-2">Featured</h4>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              Popular Blogs
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              Most Viewed
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              Editor's Choice
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              Trending Topics
            </motion.a>
          </motion.div>

          {/* Community */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="flex flex-col space-y-3"
          >
            <h4 className="text-lg font-semibold text-white mb-2">Community</h4>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
            >
              Forum
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
            >
              Support
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
            >
              Recent Posts
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
            >
              Newsletter
            </motion.a>
          </motion.div>

          {/* Legal */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="flex flex-col space-y-3"
          >
            <h4 className="text-lg font-semibold text-white mb-2">Legal</h4>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
            >
              About Us
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
            >
              Terms & Conditions
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ x: 5 }}
              className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
            >
              Cookie Policy
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            whileHover={{ scale: 1.02 }}
            className="text-gray-400 text-sm mb-4 md:mb-0"
          >
            &copy; {new Date().getFullYear()} BlogPulse. All rights reserved.
          </motion.p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-1 text-gray-400 text-sm"
          >
            <span>Made with</span>
            <FaHeart className="text-red-500" />
            <span>by BlogPulse Team</span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;