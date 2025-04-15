// ArticleView.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ArticleView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;

  const handleRemove = () => {
    const saved = localStorage.getItem('purchasedArticles');
    if (!saved) return;
    const purchased = JSON.parse(saved);
    const updated = purchased.filter(id => id !== article.id);
    localStorage.setItem('purchasedArticles', JSON.stringify(updated));
    alert('Article removed from your purchases.');
    navigate('/premium');
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-6">The requested article could not be found or you haven't purchased it.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img 
          src={article.image} 
          alt={article.name} 
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{article.name}</h1>
            <span className="text-lg font-bold text-blue-700">₹{article.price}</span>
          </div>
          <p className="text-gray-600 mb-4 italic">{article.description}</p>

          <div className="prose max-w-none text-gray-700">
            {(() => {
              const paragraphs = article.fullContent
                ? article.fullContent.split('\n').filter(p => p.trim() !== '')
                : [article.content];

              switch (article.id) {
                case 1: // The Art of Focus
                  return (
                    <>
                      <h2>Mastering Deep Work</h2>
                      <p>{paragraphs[0]}</p>
                      <blockquote>“Focus is the new IQ in the digital age.”</blockquote>
                      <h3>Strategies to Enhance Focus</h3>
                      <p>{paragraphs[1]}</p>
                      <h3>Key Takeaways</h3>
                      <ul>
                        <li>Schedule deep work sessions.</li>
                        <li>Minimize context switching.</li>
                        <li>Build rituals around focus.</li>
                      </ul>
                      <h3>Conclusion</h3>
                      <p>{paragraphs[2]}</p>
                    </>
                  );

                case 2: // Mindful Living
                  return (
                    <>
                      <h2>Living With Intention</h2>
                      <p>{paragraphs[0]}</p>
                      <blockquote>“The present moment is the only moment available to us.”</blockquote>
                      <h3>Daily Mindfulness Habits</h3>
                      <p>{paragraphs[1]}</p>
                      <h3>Key Takeaways</h3>
                      <ul>
                        <li>Start with breath awareness.</li>
                        <li>Slow down your daily activities.</li>
                        <li>Observe without judgment.</li>
                      </ul>
                      <h3>Conclusion</h3>
                      <p>{paragraphs[2]}</p>
                    </>
                  );

                case 3: // Startup Secrets
                  return (
                    <>
                      <h2>Building From the Ground Up</h2>
                      <p>{paragraphs[0]}</p>
                      <blockquote>“Move fast, break things, and learn faster.”</blockquote>
                      <h3>Founder Mindset</h3>
                      <p>{paragraphs[1]}</p>
                      <h3>Startup Tips</h3>
                      <ul>
                        <li>Launch early and iterate.</li>
                        <li>Validate before scaling.</li>
                        <li>Stay lean and customer-focused.</li>
                      </ul>
                      <h3>Conclusion</h3>
                      <p>{paragraphs[2]}</p>
                    </>
                  );

                case 4: // Design Thinking
                  return (
                    <>
                      <h2>Design With Empathy</h2>
                      <p>{paragraphs[0]}</p>
                      <blockquote>“Innovation begins when we ask the right questions.”</blockquote>
                      <h3>The Design Thinking Process</h3>
                      <p>{paragraphs[1]}</p>
                      <h3>Key Takeaways</h3>
                      <ul>
                        <li>Empathize deeply with users.</li>
                        <li>Test ideas rapidly and iterate.</li>
                        <li>Involve diverse perspectives.</li>
                      </ul>
                      <h3>Conclusion</h3>
                      <p>{paragraphs[2]}</p>
                    </>
                  );

                case 5: // Digital Detox
                  return (
                    <>
                      <h2>Reclaim Your Time</h2>
                      <p>{paragraphs[0]}</p>
                      <blockquote>“You don’t need more time. You need less screen time.”</blockquote>
                      <h3>Simple Detox Strategies</h3>
                      <p>{paragraphs[1]}</p>
                      <h3>Key Takeaways</h3>
                      <ul>
                        <li>Set screen-free zones and hours.</li>
                        <li>Replace screen time with hobbies or rest.</li>
                        <li>Use digital tools with intention.</li>
                      </ul>
                      <h3>Conclusion</h3>
                      <p>{paragraphs[2]}</p>
                    </>
                  );

                case 6: // Remote Work Culture
                  return (
                    <>
                      <h2>Thriving in Remote Teams</h2>
                      <p>{paragraphs[0]}</p>
                      <blockquote>“Remote work is less about location, and more about liberation.”</blockquote>
                      <h3>Keys to Virtual Collaboration</h3>
                      <p>{paragraphs[1]}</p>
                      <h3>Key Takeaways</h3>
                      <ul>
                        <li>Communicate clearly and asynchronously.</li>
                        <li>Trust teams with ownership and outcomes.</li>
                        <li>Protect your work-life boundaries.</li>
                      </ul>
                      <h3>Conclusion</h3>
                      <p>{paragraphs[2]}</p>
                    </>
                  );

                default:
                  return paragraphs.map((p, i) => <p key={i}>{p}</p>);
              }
            })()}
          </div>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => navigate('/premium')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Back to Articles
            </button>
            <button
              onClick={handleRemove}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Remove Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
