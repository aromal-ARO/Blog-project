import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PremiumArticles = () => {
  const navigate = useNavigate();
  const [purchasedArticles, setPurchasedArticles] = useState([]);

  // Load purchased articles from localStorage on component mount
  useEffect(() => {
    const savedPurchases = localStorage.getItem('purchasedArticles');
    if (savedPurchases) {
      setPurchasedArticles(JSON.parse(savedPurchases));
    }
  }, []);

  const articles = [
    {
      id: 1,
      name: "The Art of Focus",
      price: 199,
      image: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9jdXN8ZW58MHx8MHx8fDA%3D",
      description: "A guide to deep work and productivity in a digital age.",
      content: "Full content of The Art of Focus article... (This would be several paragraphs of actual content in a real app)"
    },
    {
      id: 2,
      name: "Mindful Living",
      price: 299,
      image: "https://images.unsplash.com/photo-1531058398365-38216c7b3ff5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlYWNlfGVufDB8fDB8fHww",
      description: "An article on embracing mindfulness and intentionality.",
      content: "Full content of Mindful Living article..."
    },
    {
      id: 3,
      name: "Startup Secrets",
      price: 349,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RhcnR1cHxlbnwwfHwwfHx8MA%3D%3D",
      description: "Lessons from top entrepreneurs on building successful startups.",
      content: "Full content of Startup Secrets article..."
    },
    {
      id: 4,
      name: "Design Thinking",
      price: 249,
      image: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzaWdufGVufDB8fDB8fHww",
      description: "Solving complex problems through design-centered innovation.",
      content: "Full content of Design Thinking article..."
    },
    {
      id: 5,
      name: "Digital Detox",
      price: 149,
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRpZ2l0YWwlMjBkZXRveHxlbnwwfHwwfHx8MA%3D%3D",
      description: "A practical guide to reclaiming your time and focus.",
      content: "Full content of Digital Detox article..."
    },
    {
      id: 6,
      name: "Remote Work Culture",
      price: 179,
      image: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9jdXN8ZW58MHx8MHx8fDA%3D",
      description: "How to thrive in distributed teams and virtual collaboration.",
      content: "Full content of Remote Work Culture article..."
    }
  ];

  const handlePayment = async (article) => {
    const options = {
      key: "", // Your Razorpay key
      amount: article.price * 100,
      currency: "INR",
      name: "Article Store",
      description: `Purchase of ${article.name}`,
      image: "https://example.com/your_logo.jpg",
      handler: function(response) {
        // Add to purchased articles
        const updatedPurchases = [...purchasedArticles, article.id];
        setPurchasedArticles(updatedPurchases);
        // Save to localStorage
        localStorage.setItem('purchasedArticles', JSON.stringify(updatedPurchases));
        
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Customer Address"
      },
      theme: {
        color: "#1e40af"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const viewArticle = (article) => {
    navigate(`/article/${article.id}`, { state: { article } });
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
          Premium Articles
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const isPurchased = purchasedArticles.includes(article.id);
            
            return (
              <div 
                key={article.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden"
              >
                <img 
                  src={article.image} 
                  alt={article.name} 
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => isPurchased && viewArticle(article)}
                />
                <div className="p-5">
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">{article.name}</h3>
                  <p className="text-gray-600 text-sm">{article.description}</p>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-lg font-bold text-blue-700">₹{article.price}</span>
                    {isPurchased ? (
                      <button
                        onClick={() => viewArticle(article)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                      >
                        View Article
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePayment(article)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                  {isPurchased && (
                    <div className="mt-2 text-sm text-green-600 font-medium">
                      Purchased
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    
    </>
  );
};

export default PremiumArticles;
