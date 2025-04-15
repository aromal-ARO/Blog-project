/* eslint-disable react/prop-types */
import { IF } from '../url';

const HomePosts = ({ post }) => {
  return (
    <div className="w-full relative group">
      {/* Background container with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-90 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
      
      {/* Background pattern (subtle) */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] rounded-lg"></div>
      
      {/* Content */}
      <div className="relative w-full flex flex-col md:flex-row p-4 md:p-6 gap-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
        {/* Left - Image */}
        <div className="w-full md:w-[35%] h-[200px] flex justify-center items-center overflow-hidden rounded-lg group-hover:rounded-xl transition-all duration-300">
          <img 
            src={IF + post.photo} 
            alt={post.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Right - Content */}
        <div className="flex flex-col w-full md:w-[65%]">
          <h1 className="text-xl font-bold md:text-2xl mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
            {post.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 text-sm text-gray-500 gap-2">
            <p className="font-medium text-black-500">@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          
          <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
            {post.desc.slice(0, 200) + " ..."}
            <span className="text-indigo-500 font-medium ml-1 hover:underline cursor-pointer">
              Read more
            </span>
          </p>
          
          {/* Tags/categories could be added here */}
          <div className="flex mt-auto">
            <span className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full">
              Blog Post
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePosts;