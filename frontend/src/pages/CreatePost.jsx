import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Chatbot from '../components/Chatbot'
import { motion } from 'framer-motion'

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const { user } = useContext(UserContext)
    const [cat, setCat] = useState("")
    const [cats, setCats] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate()

    const deleteCategory = (i) => {
        let updatedCats = [...cats]
        updatedCats.splice(i, 1)
        setCats(updatedCats)
    }

    const addCategory = () => {
        if (cat.trim() !== "") {
            let updatedCats = [...cats]
            updatedCats.push(cat)
            setCat("")
            setCats(updatedCats)
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: cats
        }

        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("img", filename)
            data.append("file", file)
            post.photo = filename
            
            try {
                await axios.post(URL + "/api/upload", data)
            } catch (err) {
                console.log(err)
                setIsSubmitting(false)
            }
        }

        try {
            const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true })
            navigate("/posts/post/" + res.data._id)
        } catch (err) {
            console.log(err)
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 bg-fixed bg-cover" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_vector-1683133606123-1c29f06ec9bc?w=3840&auto=format&fit=crop&q=90&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3JlYXRpdml0eXxlbnwwfHwwfHx8MA%3D%3D')" }}>
            <Navbar />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="px-6 md:px-[200px] py-8"
            >
                <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
                    <h1 className="font-bold text-3xl md:text-4xl text-gray-800 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                        Create a New Post
                    </h1>
                    
                    <form className="w-full flex flex-col space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Post Title</label>
                            <input 
                                onChange={(e) => setTitle(e.target.value)} 
                                type="text" 
                                placeholder="Enter post title" 
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Featured Image</label>
                            <div className="flex items-center">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {file ? file.name : "SVG, PNG, JPG or GIF (MAX. 5MB)"}
                                        </p>
                                    </div>
                                    <input 
                                        onChange={(e) => setFile(e.target.files[0])} 
                                        type="file" 
                                        className="hidden" 
                                    />
                                </label>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Categories</label>
                            <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-4">
  <input 
    value={cat} 
    onChange={(e) => setCat(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        addCategory();
      }
    }}
    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
    placeholder="Enter post category" 
    type="text"
  />
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={(e) => {
      e.preventDefault(); // Prevent form submission
      addCategory();
    }}
    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
  >
    Add
  </motion.button>
</div>
                                
                                <div className="flex flex-wrap gap-2">
                                    {cats?.map((c, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.8, opacity: 0 }}
                                            className="flex justify-center items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 rounded-full shadow-sm"
                                        >
                                            <p className="text-blue-800 font-medium">{c}</p>
                                            <button 
                                                onClick={() => deleteCategory(i)} 
                                                className="text-blue-600 hover:text-red-500 transition-colors duration-200"
                                            >
                                                <ImCross size={12}/>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Post Content</label>
                            <textarea 
                                onChange={(e) => setDesc(e.target.value)} 
                                rows={10} 
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                                placeholder="Write your post content here..."
                            />
                        </div>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCreate}
                            disabled={isSubmitting}
                            className={`w-full md:w-1/3 mx-auto text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ${
                                isSubmitting 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Publishing...
                                </span>
                            ) : (
                                "Publish Post"
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
            
            <Chatbot apiKey="" />
            <Footer />
        </div>
    )
}

export default CreatePost
